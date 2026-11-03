(function (root) {
  const mimeExtensions = new Map([
    ["image/jpeg", "jpg"],
    ["image/png", "png"],
    ["image/webp", "webp"],
    ["image/gif", "gif"],
    ["video/mp4", "mp4"],
  ]);

  function getUrlExtension(url) {
    const match = String(url || "").match(/\.([0-9a-z]+)(?:[?#]|$)/i);
    return match && match[1] ? match[1].toLowerCase() : "";
  }

  function requiresContentInspection(url) {
    return /\.(?:hei[cf]|webp)(?:[?#]|$)/i.test(String(url || ""));
  }

  function replaceExtension(filename, extension) {
    const safeExtension = String(extension || "").toLowerCase();
    if (!safeExtension) return filename;
    return String(filename || "").replace(/\.[0-9a-z]+$/i, `.${safeExtension}`);
  }

  async function getDownloadedExtension(blob, url) {
    if (blob && typeof blob.slice === "function") {
      const bytes = new Uint8Array(await blob.slice(0, 16).arrayBuffer());
      if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
        return "jpg";
      }
      if (
        bytes.length >= 8 &&
        bytes[0] === 0x89 &&
        bytes[1] === 0x50 &&
        bytes[2] === 0x4e &&
        bytes[3] === 0x47 &&
        bytes[4] === 0x0d &&
        bytes[5] === 0x0a &&
        bytes[6] === 0x1a &&
        bytes[7] === 0x0a
      ) {
        return "png";
      }
      const header = new TextDecoder("ascii").decode(bytes);
      if (header.startsWith("GIF87a") || header.startsWith("GIF89a")) return "gif";
      if (header.startsWith("RIFF") && header.slice(8, 12) === "WEBP") return "webp";
    }

    const mimeType = String((blob && blob.type) || "")
      .split(";", 1)[0]
      .trim()
      .toLowerCase();
    return mimeExtensions.get(mimeType) || getUrlExtension(url) || "jpg";
  }

  async function convertWebpToJpeg(blob) {
    if ((await getDownloadedExtension(blob, "")) !== "webp") return blob;
    if (typeof createImageBitmap !== "function" || typeof document === "undefined") return blob;

    let bitmap;
    try {
      bitmap = await createImageBitmap(blob);
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const context = canvas.getContext("2d");
      if (!context) return blob;
      context.drawImage(bitmap, 0, 0);
      return (await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92))) || blob;
    } catch (_error) {
      return blob;
    } finally {
      if (bitmap) bitmap.close();
    }
  }

  const api = {
    getDownloadedExtension,
    getUrlExtension,
    convertWebpToJpeg,
    replaceExtension,
    requiresContentInspection,
  };
  root.__igdlMediaFormat = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof globalThis === "object" ? globalThis : this);
