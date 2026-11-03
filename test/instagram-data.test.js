const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");

const instagramData = require("../js/instagram-data.js");

test("Relay reels keep nested caption text for description sidecars", () => {
  assert.equal(
    instagramData.getCaption({ caption: { text: "underway" } }),
    "underway",
  );
});

test("feed post links resolve shortcode with username prefix and query", () => {
  assert.equal(
    instagramData.getPostShortcodeFromLinks([
      "https://www.instagram.com/creator/p/AbC123/?img_index=2",
    ]),
    "AbC123",
  );
});

test("reel and reels links resolve shortcode", () => {
  assert.equal(
    instagramData.getPostShortcodeFromLinks(["/reel/Reel123?igsh=abc"]),
    "Reel123",
  );
  assert.equal(
    instagramData.getPostShortcodeFromLinks(["/creator/reels/Reel456/"]),
    "Reel456",
  );
});

test("XHR observer does not read Instagram's forbidden response headers", () => {
  const source = fs.readFileSync(require.resolve("../js/inject.js"), "utf8");
  assert.doesNotMatch(source, /getResponseHeader\(["']x-ig-(?:set-)?www-claim/i);
});
