const assert = require("node:assert/strict");
const test = require("node:test");

const mediaFormat = require("../js/media-format.js");

test("JPEG bytes behind a HEIC URL use a JPG filename", async () => {
  const jpeg = new Blob([Uint8Array.from([0xff, 0xd8, 0xff, 0xe0, 0, 16])]);
  assert.equal(
    await mediaFormat.getDownloadedExtension(jpeg, "https://cdn.example/photo.heic?x=1"),
    "jpg",
  );
  assert.equal(
    mediaFormat.replaceExtension("2026-10-16 - user - code.heic", "jpg"),
    "2026-10-16 - user - code.jpg",
  );
});

test("image signatures win over a misleading URL", async () => {
  const fixtures = [
    ["jpg", [0xff, 0xd8, 0xff, 0xe0]],
    ["png", [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
    ["webp", [...Buffer.from("RIFF"), 0, 0, 0, 0, ...Buffer.from("WEBP")]],
    ["gif", [...Buffer.from("GIF89a")]],
  ];
  for (const [extension, bytes] of fixtures) {
    const blob = new Blob([Uint8Array.from(bytes)]);
    assert.equal(
      await mediaFormat.getDownloadedExtension(blob, "https://cdn.example/photo.heic"),
      extension,
    );
  }
});

test("trusted MIME and URL extensions remain compatible", async () => {
  assert.equal(
    await mediaFormat.getDownloadedExtension(
      new Blob(["video"], { type: "video/mp4" }),
      "https://cdn.example/media",
    ),
    "mp4",
  );
  assert.equal(
    await mediaFormat.getDownloadedExtension(new Blob(["image"]), "https://cdn.example/photo.png"),
    "png",
  );
});

test("HEIC, HEIF, and WebP URLs require inspection before duplicate checks", () => {
  assert.equal(mediaFormat.requiresContentInspection("https://cdn.example/photo.heic?x=1"), true);
  assert.equal(mediaFormat.requiresContentInspection("https://cdn.example/photo.HEIF"), true);
  assert.equal(mediaFormat.requiresContentInspection("https://cdn.example/photo.webp"), true);
  assert.equal(mediaFormat.requiresContentInspection("https://cdn.example/photo.jpg"), false);
  assert.equal(mediaFormat.requiresContentInspection("https://cdn.example/video.mp4"), false);
});
