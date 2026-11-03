(function (root) {
  function getCaption(post) {
    if (!post) return "";
    const caption = post.caption || post.caption_text;
    if (typeof caption === "string") return caption;
    if (caption && typeof caption.text === "string") return caption.text;

    const edgeCaption = post.edge_media_to_caption?.edges?.[0]?.node?.text;
    if (typeof edgeCaption === "string") return edgeCaption;
    const relayCaption = post.caption?.text;
    return typeof relayCaption === "string" ? relayCaption : "";
  }

  function getPostShortcodeFromLinks(hrefs) {
    for (const href of hrefs || []) {
      try {
        const path = new URL(href, "https://www.instagram.com").pathname;
        const match = path.match(/(?:^|\/)(?:p|reel|reels)\/([^/]+)/);
        if (match) return match[1];
      } catch (_error) {}
    }
    return "";
  }

  root.__igdlInstagramData = { getCaption, getPostShortcodeFromLinks };
  if (typeof module === "object" && module.exports) {
    module.exports = root.__igdlInstagramData;
  }
})(typeof globalThis === "object" ? globalThis : this);
