!(function () {
  try {
    var e =
        "undefined" != typeof window
          ? window
          : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
              ? self
              : {},
      t = new Error().stack;
    t &&
      ((e._sentryDebugIds = e._sentryDebugIds || {}),
      (e._sentryDebugIds[t] = "741a3773-e766-4213-a358-5391bc41a033"),
      (e._sentryDebugIdIdentifier =
        "sentry-dbid-741a3773-e766-4213-a358-5391bc41a033"));
  } catch (e) {}
})();
var _global =
  "undefined" != typeof window
    ? window
    : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
        ? self
        : {};
((_global.SENTRY_RELEASE = { id: "2355ac7aea3ec4f8c529032b6c317c6bbb252cc2" }),
  (() => {
    var e = {
        561: () => {
          var e;
          ((history.pushState =
            ((e = history.pushState),
            function () {
              arguments[2] &&
                arguments[2].startsWith("https://") &&
                arguments[2].includes("?img_index=") &&
                (arguments[2] = "?" + arguments[2].split("?")[1]);
              var t = e.apply(this, arguments);
              return (
                window.dispatchEvent(new Event("pushstate")),
                window.dispatchEvent(new Event("locationchange")),
                t
              );
            })),
            (history.replaceState = ((e) =>
              function () {
                arguments[2] &&
                  arguments[2].startsWith("https://") &&
                  arguments[2].includes("?img_index=") &&
                  (arguments[2] = "?" + arguments[2].split("?")[1]);
                var t = e.apply(this, arguments);
                return (
                  window.dispatchEvent(new Event("replacestate")),
                  window.dispatchEvent(new Event("locationchange")),
                  t
                );
              })(history.replaceState)),
            window.addEventListener("popstate", () => {
              window.dispatchEvent(new Event("locationchange"));
            }));
        },
        816: () => {
          (() => {
            function saveClaim(c) {
              if (c && typeof c === "string" && c !== "0" && c !== "undefined") {
                try {
                  sessionStorage.setItem("__ig_www_claim", c);
                  localStorage.setItem("__ig_www_claim", c);
                } catch (e) {}
              }
            }
            function saveAppId(id) {
              if (id && typeof id === "string" && id !== "undefined") {
                try {
                  sessionStorage.setItem("__ig_app_id", id);
                  localStorage.setItem("__ig_app_id", id);
                } catch (e) {}
              }
            }

            if (typeof window.fetch === "function") {
              const origFetch = window.fetch;
              window.fetch = function (resource, init) {
                try {
                  if (init && init.headers) {
                    const h = init.headers;
                    let claim, appId;
                    if (typeof Headers !== "undefined" && h instanceof Headers) {
                      claim = h.get("x-ig-www-claim");
                      appId = h.get("x-ig-app-id");
                    } else if (Array.isArray(h)) {
                      for (const [k, v] of h) {
                        if (typeof k === "string" && k.toLowerCase() === "x-ig-www-claim") claim = v;
                        if (typeof k === "string" && k.toLowerCase() === "x-ig-app-id") appId = v;
                      }
                    } else if (typeof h === "object") {
                      claim = h["x-ig-www-claim"] || h["X-IG-WWW-CLAIM"];
                      appId = h["x-ig-app-id"] || h["X-IG-APP-ID"];
                    }
                    if (claim) saveClaim(claim);
                    if (appId) saveAppId(appId);
                  }
                } catch (err) {}

                return origFetch.apply(this, arguments).then((response) => {
                  try {
                    if (response && response.headers && typeof response.headers.get === "function") {
                      const setClaim = response.headers.get("x-ig-set-www-claim") || response.headers.get("x-ig-www-claim");
                      if (setClaim) saveClaim(setClaim);
                    }
                  } catch (err) {}
                  return response;
                });
              };
            }

            if (typeof window.XMLHttpRequest === "function") {
              const origSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
              const origSend = XMLHttpRequest.prototype.send;

              XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
                try {
                  if (typeof header === "string") {
                    const lower = header.toLowerCase();
                    if (lower === "x-ig-www-claim") saveClaim(value);
                    if (lower === "x-ig-app-id") saveAppId(value);
                  }
                } catch (err) {}
                return origSetRequestHeader.apply(this, arguments);
              };

              XMLHttpRequest.prototype.send = function () {
                try {
                  this.addEventListener("readystatechange", () => {
                    try {
                      if (this.readyState === 2 || this.readyState === 4) {
                        const setClaim = this.getResponseHeader("x-ig-set-www-claim") || this.getResponseHeader("x-ig-www-claim");
                        if (setClaim) saveClaim(setClaim);
                      }
                    } catch (err) {}
                  });
                } catch (err) {}
                return origSend.apply(this, arguments);
              };
            }
          })();
          "#__ig_downloader_options" !== location.hash &&
            (window.addEventListener("message", async (e) => {
              if (
                "https://www.instagram.com" === e.origin &&
                e.ports &&
                e.ports.length > 0 &&
                e.data &&
                e.data.procedure
              ) {
                const t = e.data;
                if ("loadPostFromShortcode" === t.procedure) {
                  const r = t.shortcode,
                    n = await (async function (e) {
                      return window
                        .require("CometRelay")
                        .fetchQuery(
                          window.require("PolarisRelayEnvironment"),
                          window.require("PolarisPostActionLoadPostQuery")
                            .POST_QUERY,
                          {
                            child_comment_count: 3,
                            fetch_comment_count: 40,
                            has_threaded_comments: !0,
                            parent_comment_count: 24,
                            shortcode: e,
                          },
                        )
                        .toPromise();
                    })(r);
                  let i;
                  try {
                    i =
                      n.xdt_shortcode_media.__fragments
                        .PolarisPostActionLoadPostQueryInlineFragment ||
                      n.xdt_shortcode_media.__fragments
                        .PolarisPostActionLoadPostQueryInlineFragmentWithoutRelatedProfiles;
                  } catch (e) {
                    (console.log(r), console.error(e));
                  }
                  return void e.ports[0].postMessage(i);
                }
                function resolveNode(node, source, fallbackUsername) {
                  if (!node) return null;
                  const user = node.user?.__ref ? source.get(node.user.__ref) : null;
                  const ownerUsername = user?.username || fallbackUsername;
                  let candidates = null;
                  if (node.image_versions2?.__ref) {
                    const imgV = source.get(node.image_versions2.__ref);
                    if (imgV?.candidates?.__refs) {
                      candidates = imgV.candidates.__refs
                        .map((r) => source.get(r))
                        .filter(Boolean);
                    }
                  }
                  let carousel = null;
                  if (node.carousel_media?.__refs) {
                    carousel = node.carousel_media.__refs
                      .map((r) => {
                        const cNode = source.get(r);
                        if (!cNode) return null;
                        let cCands = null;
                        if (cNode.image_versions2?.__ref) {
                          const cImg = source.get(cNode.image_versions2.__ref);
                          if (cImg?.candidates?.__refs) {
                            cCands = cImg.candidates.__refs
                              .map((cr) => source.get(cr))
                              .filter(Boolean);
                          }
                        }
                        return {
                          id: cNode.id || cNode.pk,
                          pk: cNode.pk || cNode.id,
                          taken_at: cNode.taken_at,
                          user: { username: ownerUsername },
                          image_versions2: cCands ? { candidates: cCands } : null,
                          video_versions: cNode.video_versions || null,
                        };
                      })
                      .filter(Boolean);
                  }
                  return {
                    id: node.id || node.pk,
                    pk: node.pk || node.id,
                    code: node.code,
                    taken_at: node.taken_at,
                    user: { username: ownerUsername },
                    image_versions2: candidates ? { candidates } : null,
                    carousel_media: carousel,
                    video_versions: node.video_versions || null,
                    media_type: node.media_type || (carousel ? 8 : (node.product_type === "clips" || node.is_video ? 2 : 1)),
                    product_type: node.product_type || "feed",
                  };
                }

                function getUserIdForUsername(username, source) {
                  if (!username) return null;
                  const ids = source.getRecordIDs ? source.getRecordIDs() : [];
                  for (const id of ids) {
                    if (id.startsWith("XDTUserDict:")) {
                      const rec = source.get(id);
                      if (rec && rec.username && rec.username.toLowerCase() === username.toLowerCase()) {
                        return rec.id || rec.pk;
                      }
                    }
                  }
                  return null;
                }

                if ("loadUserTimeline" === t.procedure) {
                  try {
                    const CometRelay = window.require("CometRelay");
                    const env = window.require("PolarisRelayEnvironment");
                    const query = window.require("PolarisProfilePostsQuery");
                    const username = t.username;
                    const after = t.after || null;
                    const source = env.getStore().getSource();

                    let recordKey = null;
                    if (after) {
                      recordKey = source
                        .getRecordIDs()
                        .find(
                          (id) =>
                            id.includes("user_timeline_graphql_connection") &&
                            id.includes(after),
                        );
                    } else {
                      recordKey = source
                        .getRecordIDs()
                        .find(
                          (id) =>
                            id.includes("user_timeline_graphql_connection") &&
                            id.includes(username),
                        );
                    }

                    if (!recordKey) {
                      await CometRelay.fetchQuery(env, query, {
                        data: {
                          count: 12,
                          include_reel_media_seen_timestamp: true,
                          include_relationship_info: true,
                          latest_besties_reel_media: true,
                          latest_reel_media: true,
                        },
                        username,
                        first: 12,
                        last: null,
                        before: null,
                        after,
                      }).toPromise();

                      if (after) {
                        recordKey = source
                          .getRecordIDs()
                          .find(
                            (id) =>
                              id.includes("user_timeline_graphql_connection") &&
                              id.includes(after),
                          );
                      } else {
                        recordKey = source
                          .getRecordIDs()
                          .find(
                            (id) =>
                              id.includes("user_timeline_graphql_connection") &&
                              id.includes(username),
                          );
                      }
                    }

                    const record = recordKey ? source.get(recordKey) : null;
                    const edgeRefs = record?.edges?.__refs || [];
                    const items = edgeRefs
                      .map((r) => {
                        const edge = source.get(r);
                        return edge?.node?.__ref
                          ? resolveNode(source.get(edge.node.__ref), source, username)
                          : null;
                      })
                      .filter(Boolean);

                    const pageInfo = record?.page_info?.__ref
                      ? source.get(record.page_info.__ref)
                      : null;

                    return void e.ports[0].postMessage({
                      items,
                      next_max_id: pageInfo?.has_next_page
                        ? pageInfo.end_cursor
                        : void 0,
                      more_available: Boolean(pageInfo?.has_next_page),
                    });
                  } catch (err) {
                    console.error("loadUserTimeline error:", err);
                    return void e.ports[0].postMessage(null);
                  }
                }

                if ("loadUserReels" === t.procedure) {
                  try {
                    const CometRelay = window.require("CometRelay");
                    const env = window.require("PolarisRelayEnvironment");
                    const source = env.getStore().getSource();
                    const username = t.username;
                    let userId = t.userId || getUserIdForUsername(username, source);

                    if (!userId) {
                      try {
                        const uRes = await fetch(
                          `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
                          {
                            headers: {
                              "x-ig-app-id": "936619743392459",
                              "x-requested-with": "XMLHttpRequest",
                            },
                            credentials: "include",
                          },
                        );
                        const uData = await uRes.json();
                        if (uData?.data?.user?.id) userId = uData.data.user.id;
                      } catch (err) {}
                    }

                    if (!userId) {
                      return void e.ports[0].postMessage({ items: [], more_available: false });
                    }

                    let query = null;
                    try {
                      query = window.require("PolarisProfileReelsTabContentQuery.graphql");
                    } catch (err) {}
                    if (!query) {
                      const rr = window.require("relay-runtime");
                      query = rr?.PreloadableQueryRegistry?.get("28217628591240469");
                    }

                    const after = t.after || null;
                    const variables = {
                      user_id: userId,
                      first: 12,
                      after: after,
                      data: {
                        include_feed_video: true,
                        page_size: 12,
                        target_user_id: userId,
                      },
                    };

                    await CometRelay.fetchQuery(env, query, variables).toPromise();

                    const ids = source.getRecordIDs ? source.getRecordIDs() : [];
                    let connKey = null;
                    if (after) {
                      connKey = ids.find(
                        (id) =>
                          id.includes(userId) &&
                          id.includes("clips_connection") &&
                          id.includes(after),
                      );
                    }
                    if (!connKey) {
                      connKey = ids.find(
                        (id) =>
                          id.includes(userId) &&
                          id.includes('clips_connection(data:{"include_feed_video":true,"page_size":12,"target_user_id":"' + userId + '"'),
                      );
                    }
                    if (!connKey) {
                      connKey = ids.find(
                        (id) => id.includes(userId) && id.includes("clips_connection"),
                      );
                    }

                    const conn = connKey ? source.get(connKey) : null;
                    const pi = conn?.page_info?.__ref ? source.get(conn.page_info.__ref) : null;
                    const edges = conn?.edges?.__refs || [];

                    const items = edges
                      .map((ref) => {
                        const edge = source.get(ref);
                        if (!edge || !edge.node) return null;
                        const node = source.get(edge.node.__ref);
                        if (!node) return null;
                        const mediaRef = (node.media && node.media.__ref) || edge.node.__ref;
                        const media = source.get(mediaRef);
                        if (!media) return null;
                        return resolveNode(media, source, username);
                      })
                      .filter(Boolean);

                    return void e.ports[0].postMessage({
                      items,
                      next_max_id: pi?.has_next_page ? pi.end_cursor : void 0,
                      more_available: Boolean(pi?.has_next_page),
                    });
                  } catch (err) {
                    console.error("loadUserReels error:", err);
                    return void e.ports[0].postMessage(null);
                  }
                }

                if ("loadUserTagged" === t.procedure) {
                  try {
                    const CometRelay = window.require("CometRelay");
                    const env = window.require("PolarisRelayEnvironment");
                    const source = env.getStore().getSource();
                    const username = t.username;
                    let userId = t.userId || getUserIdForUsername(username, source);

                    if (!userId) {
                      try {
                        const uRes = await fetch(
                          `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`,
                          {
                            headers: {
                              "x-ig-app-id": "936619743392459",
                              "x-requested-with": "XMLHttpRequest",
                            },
                            credentials: "include",
                          },
                        );
                        const uData = await uRes.json();
                        if (uData?.data?.user?.id) userId = uData.data.user.id;
                      } catch (err) {}
                    }

                    if (!userId) {
                      return void e.ports[0].postMessage({ items: [], more_available: false });
                    }

                    const JSResource = window.require("JSResourceForInteraction");
                    if (JSResource) {
                      try {
                        await JSResource("PolarisProfileTaggedTabRoot.react").load();
                      } catch (err) {}
                    }
                    const rr = window.require("relay-runtime");
                    const query = rr?.PreloadableQueryRegistry?.get("28463910693308962");

                    const after = t.after || null;
                    const variables = {
                      user_id: userId,
                      count: 12,
                      after: after,
                    };

                    await CometRelay.fetchQuery(env, query, variables).toPromise();

                    const ids = source.getRecordIDs ? source.getRecordIDs() : [];
                    let connKey = null;
                    if (after) {
                      connKey = ids.find(
                        (id) =>
                          id.includes(userId) &&
                          id.includes("usertags__user_id__feed_connection") &&
                          id.includes(after),
                      );
                    }
                    if (!connKey) {
                      connKey = ids.find(
                        (id) =>
                          id.includes(userId) &&
                          id.includes("usertags__user_id__feed_connection"),
                      );
                    }

                    const conn = connKey ? source.get(connKey) : null;
                    const pi = conn?.page_info?.__ref ? source.get(conn.page_info.__ref) : null;
                    const edges = conn?.edges?.__refs || [];

                    const items = edges
                      .map((ref) => {
                        const edge = source.get(ref);
                        if (!edge || !edge.node) return null;
                        const media = source.get(edge.node.__ref);
                        if (!media) return null;
                        return resolveNode(media, source, username);
                      })
                      .filter(Boolean);

                    return void e.ports[0].postMessage({
                      items,
                      next_max_id: pi?.has_next_page ? pi.end_cursor : void 0,
                      more_available: Boolean(pi?.has_next_page),
                    });
                  } catch (err) {
                    console.error("loadUserTagged error:", err);
                    return void e.ports[0].postMessage(null);
                  }
                }
                (console.log(t), e.ports[0].postMessage(void 0));
              }
            }),
            (() => {
              let eRetryCount = 0;
              function e() {
                try {
                  if (typeof window.require === "function") {
                    const c = window.require("PolarisWWWClaim");
                    if (c && typeof c.getWWWClaim === "function") {
                      const claim = c.getWWWClaim();
                      if (claim) sessionStorage.setItem("__ig_www_claim", claim);
                    }
                  }
                } catch (t) {
                  if (++eRetryCount < 10) setTimeout(e, 500);
                }
              }
              function t(e) {
                return "string" == typeof e && e.match(/^\d+$/);
              }
              function r(e) {
                if (!e) return;
                let r;
                for (let s of Object.keys(e))
                  if (s.startsWith("__reactFiber$")) {
                    try {
                      let r = e[s].return.memoizedProps.id;
                      if (r && t(r)) return r;
                    } catch (e) {}
                    if (e[s].child)
                      try {
                        if (((r = e[s].child.memoizedProps.id), r && t(r)))
                          return r;
                      } catch (e) {}
                    if (e[s].return) {
                      try {
                        if (((r = e[s].return.memoizedProps.post.id), r))
                          return r;
                      } catch (e) {}
                      try {
                        if (((r = e[s].return.memoizedProps.postId), r))
                          return r;
                      } catch (e) {}
                    }
                    if (e[s].return && e[s].return.return)
                      try {
                        if (
                          ((r = e[s].return.return.memoizedProps.videoFBID), r)
                        )
                          return r;
                        if (
                          ((r = e[s].return.return.memoizedProps.id), r && t(r))
                        )
                          return r;
                      } catch (e) {}
                    try {
                      if (
                        e[s].return.return.return.return.return.memoizedProps
                          .id &&
                        ((r =
                          e[s].return.return.return.return.return.memoizedProps
                            .id),
                        r && t(r))
                      )
                        return r;
                    } catch (e) {}
                    try {
                      if (
                        e[s].return.return.return.return.return.return.key &&
                        ((r =
                          e[s].return.return.return.return.return.return.key),
                        r)
                      )
                        return ((r = r.split("_")[0]), r);
                    } catch (e) {}
                    try {
                      if (
                        e[s].return.return.return.return.return.return.return
                          .return.key &&
                        ((r =
                          e[s].return.return.return.return.return.return.return
                            .return.key),
                        r)
                      )
                        return ((r = r.split("_")[0]), r);
                    } catch (e) {}
                    if (((r = n(e[s], 20, 0)), r && r.match(/^\d+$/))) return r;
                    if (((r = i(e[s], 20, 0)), r)) {
                      if (r.match(/^\d+_\d+$/))
                        return ((r = r.split("_")[0]), r);
                      if (r.match(/^\d+$/)) return r;
                    }
                  }
              }
              function n(e, t, r = 0) {
                return e.memoizedProps && e.memoizedProps.id
                  ? e.memoizedProps.id
                  : e.memoizedProps &&
                      e.memoizedProps.post &&
                      e.memoizedProps.post.id
                    ? e.memoizedProps.post.id
                    : e.memoizedProps &&
                        e.memoizedProps.media &&
                        e.memoizedProps.media.pk
                      ? e.memoizedProps.media.pk
                      : e.memoizedProps && e.memoizedProps.postId
                        ? e.memoizedProps.postId
                        : e.id
                          ? e.id
                          : r >= t
                            ? e.memoizedProps.id
                            : n(e.return, t, r + 1);
              }
              function i(e, t, r = 0) {
                return e.key || r >= t ? e.key : i(e.return, t, r + 1);
              }
              function s(e) {
                let n = e.querySelectorAll("._aatk._aiao > div");
                for (let e of n) {
                  let n = r(e);
                  n && t(n) && e.setAttribute("__igdl_id", n);
                }
                n = e.querySelectorAll("video");
                for (let e of n) {
                  let n = r(e);
                  n && t(n) && e.setAttribute("__igdl_id", n);
                }
                n = e.querySelectorAll("article");
                for (let e of n) {
                  let n = r(e);
                  n && t(n) && e.setAttribute("__igdl_id", n);
                }
                n = e.querySelectorAll("a._a6hd");
                for (let e of n) {
                  let n = r(e);
                  n && t(n) && e.setAttribute("__igdl_id", n);
                }
                n = e.querySelectorAll(
                  ".x9f619.xjbqb8w.x1lliihq.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1n2onr6.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1",
                );
                for (let e of n) {
                  let n = r(e);
                  n &&
                    t(n) &&
                    (e.setAttribute("__igdl_id", n),
                    e
                      .querySelectorAll("a._a6hd")
                      .forEach((e) => e.setAttribute("__igdl_id", n)));
                }
                n = e.querySelectorAll("img");
                for (let e of n) {
                  if (e && e.parentNode && e.parentNode.parentNode) {
                    let n = r(e.parentNode.parentNode);
                    if (n && t(n)) {
                      e.setAttribute("__igdl_id", n);
                      continue;
                    }
                  }
                  if (
                    e &&
                    e.parentNode &&
                    e.parentNode.parentNode &&
                    e.parentNode.parentNode.parentNode
                  ) {
                    let n = r(e.parentNode.parentNode.parentNode);
                    n && t(n) && e.setAttribute("__igdl_id", n);
                  }
                }
              }
              (!(function () {
                try {
                  if (typeof window.require === "function") {
                    const c = window.require("PolarisConfig");
                    if (c && typeof c.getIGAppID === "function") {
                      const id = c.getIGAppID();
                      if (id) {
                        sessionStorage.setItem("__ig_app_id", id);
                        localStorage.setItem("__ig_app_id", id);
                      }
                    }
                  } else if (!sessionStorage.getItem("__ig_app_id")) {
                    sessionStorage.setItem("__ig_app_id", "936619743392459");
                  }
                } catch (t) {}
              })(),
                e(),
                (function () {
                  const t = "function" == typeof window.require ? "1" : "";
                  if (t !== sessionStorage.getItem("__ig_has_require")) {
                    sessionStorage.setItem("__ig_has_require", t);
                  }
                })(),
                window.addEventListener("storage", (t) => {
                  t.key &&
                    !t.key.startsWith("__ig_") &&
                    t.oldValue &&
                    t.newValue &&
                    ("0" == t.oldValue ||
                      t.newValue.startsWith("hmac.") ||
                      t.key.includes("www")) &&
                    e();
                }));
              const o = { attributes: !0, childList: !0, subtree: !0 },
                a = new MutationObserver((e, t) => {
                  for (const t of e)
                    (t.addedNodes[0] &&
                      t.addedNodes[0].querySelector &&
                      s(t.addedNodes[0]),
                      t.target && t.target.querySelector && s(t.target));
                });
              !(function e() {
                try {
                  const e = document.querySelector("body");
                  (a.observe(e, o), s(e));
                } catch (t) {
                  setTimeout(e, 50);
                }
              })();
            })());
        },
      },
      t = {};
    function r(n) {
      var i = t[n];
      if (void 0 !== i) return i.exports;
      var s = (t[n] = { exports: {} });
      return (e[n](s, s.exports, r), s.exports);
    }
    (() => {
      "use strict";
      var e, t, n, i, s, o;
      function a(e, t, r, n) {
        return new (r || (r = Promise))(function (i, s) {
          function o(e) {
            try {
              d(n.next(e));
            } catch (e) {
              s(e);
            }
          }
          function a(e) {
            try {
              d(n.throw(e));
            } catch (e) {
              s(e);
            }
          }
          function d(e) {
            var t;
            e.done
              ? i(e.value)
              : ((t = e.value),
                t instanceof r
                  ? t
                  : new r(function (e) {
                      e(t);
                    })).then(o, a);
          }
          d((n = n.apply(e, t || [])).next());
        });
      }
      (r(561),
        r(816),
        (function (e) {
          ((e.AccountImage = "AccountImage"),
            (e.BulkPost = "BulkPost"),
            (e.Hotkey = "Hotkey"),
            (e.Post = "Post"),
            (e.Story = "Story"),
            (e.Home = "Home"),
            (e.Explore = "Explore"),
            (e.Channel = "Channel"),
            (e.Tv = "TV"),
            (e.Saved = "Saved"),
            (e.Tagged = "Tagged"),
            (e.Account = "Account"),
            (e.Reels = "Reels"),
            (e.HoverPost = "HoverPost"),
            (e.ReelsFeed = "ReelsFeed"),
            (e.PostSlider = "PostSlider"));
        })(e || (e = {})),
        (function (e) {
          ((e[(e.single = 0)] = "single"),
            (e[(e.bulk = 1)] = "bulk"),
            (e[(e.visit = 2)] = "visit"),
            (e[(e.bulkPost = 3)] = "bulkPost"));
        })(t || (t = {})),
        (function (e) {
          ((e.default = "log"), (e.warn = "warn"), (e.error = "error"));
        })(n || (n = {})),
        Object.create,
        Object.create,
        "function" == typeof SuppressedError && SuppressedError,
        (function (e) {
          ((e.INSTA_API = "PolarisInstapi"),
            (e.INSTA_AJAX = "PolarisInstajax"),
            (e.COOKIES = "PolarisCookies"),
            (e.CONFIG = "PolarisConfig"),
            (e.MEDIA_CONSTS = "PolarisMediaConstants"),
            (e.STORIES_STRINGS = "PolarisStoriesStrings"));
        })(i || (i = {})),
        (function (e) {
          ((e.STORY_INIT = "story_init"),
            (e.STORY_REELS_DATA_FETCH = "story_reels_data_fetch"),
            (e.STORY_REELS_TRAY = "story_reels_tray"),
            (e.STORY_DOWNLOAD = "story_download"),
            (e.STORY_REEL_MEDIA = "story_reel_media"),
            (e.STORY_REEL_FETCH = "story_reel_fetch"),
            (e.STORY_UI_UPDATE = "story_ui_update"));
        })(s || (s = {})),
        (function (e) {
          ((e.ADD_DOWNLOAD_BUTTON = "add_download_button"),
            (e.REMOVE_DOWNLOAD_BUTTON = "remove_download_button"));
        })(o || (o = {})));
      const d = {
          method: "apiGet",
          url: "/api/v1/feed/reels_tray/",
          data: { query: { is_following_feed: !1 } },
        },
        l = {
          method: "apiGet",
          url: "/api/v1/feed/reels_media/",
          data: { query: { media_id: "", reel_ids: "" } },
        };
      class u {
        static init() {
          if (!this._instances) {
            this._instances = {};
            for (const e in i) this._instances[i[e]] = this._getModule(e);
          }
        }
        static _getModule(e) {
          if (window.require)
            try {
              return window.require(i[e]);
            } catch (e) {
              return (n.error, null);
            }
        }
        static getStoryReelsTray() {
          return a(this, void 0, void 0, function* () {
            if (!this._instances[i.INSTA_API])
              return (i.INSTA_API, n.error, null);
            const e = JSON.parse(JSON.stringify(d)),
              { data: t } = yield this._instances[i.INSTA_API][e.method](
                e.url,
                e.data,
              );
            return t.tray;
          });
        }
        static getStoryReelMedia(e, t) {
          return a(this, void 0, void 0, function* () {
            if (!this._instances[i.INSTA_API])
              return (i.INSTA_API, n.error, null);
            const r = JSON.parse(JSON.stringify(l));
            ((r.data.query.media_id = null == t ? void 0 : t.join(",")),
              (r.data.query.reel_ids = e.join(",")));
            const { data: s } = yield this._instances[i.INSTA_API][r.method](
              r.url,
              r.data,
            );
            return s;
          });
        }
        static getMediaTypes() {
          return this._instances[i.MEDIA_CONSTS]
            ? this._instances[i.MEDIA_CONSTS].MediaTypes
            : null;
        }
        static getViewStoryStringParts(e) {
          var t, r, n, s;
          return this._instances[i.STORIES_STRINGS]
            ? {
                subtitleText:
                  null ===
                    (r =
                      null ===
                        (t = this._instances[
                          i.STORIES_STRINGS
                        ].viewStorySubtitleText(
                          null == e ? void 0 : e.username,
                        )) || void 0 === t
                        ? void 0
                        : t.$1) || void 0 === r
                    ? void 0
                    : r[0],
                viewStory:
                  null ===
                    (s =
                      null ===
                        (n = this._instances[i.STORIES_STRINGS].VIEW_STORY) ||
                      void 0 === n
                        ? void 0
                        : n.$1) || void 0 === s
                    ? void 0
                    : s[0],
              }
            : null;
        }
      }
      u._instances = null;
      class c {
        constructor() {
          ((this._subscribers = {}),
            window.addEventListener("message", this.handleMessages.bind(this)));
        }
        handleMessages(e) {
          const t = e.data;
          if (!t) return;
          const r = t.type,
            n = t.payload;
          if (this._subscribers[r]) for (const e of this._subscribers[r]) e(n);
        }
        removeListener(e, t) {
          var r, n;
          null === (r = this._subscribers[e]) ||
            void 0 === r ||
            r.splice(
              null === (n = this._subscribers[e]) || void 0 === n
                ? void 0
                : n.findIndex((e) => e === t),
              1,
            );
        }
        onMessage(e, t) {
          e in this._subscribers || (this._subscribers[e] = []);
          const r = this._subscribers[e];
          return (
            r.includes(t) || r.push(t),
            this.removeListener.bind(this, e, t)
          );
        }
        sendMessage(e, t) {
          const r = { type: e, payload: t };
          window.postMessage(r);
        }
      }
      var _;
      !(function (e) {
        ((e.HOME = "home"),
          (e.POST = "post"),
          (e.EXPLORE = "explore"),
          (e.STORY = "story"),
          (e.CHANNEL = "channel"),
          (e.TV = "tv"),
          (e.SAVED = "saved"),
          (e.TAGGED = "tagged"),
          (e.ACCOUNT = "account"),
          (e.REELS = "reels"),
          (e.REELS_FEED = "reels_feed"));
      })(_ || (_ = {}));
      class h {
        static parseUrlData(e, t) {
          const r = e.split("/"),
            n = t.split("/"),
            i = {};
          for (let e = 0; e < r.length; e++) {
            let t = r[e];
            if (!t || "" === t.trim() || "{" !== t[0]) continue;
            if (((t = t.slice(1, -1)), "" === t.trim())) continue;
            let s = t.startsWith("?"),
              o = s ? t.slice(1) : t;
            e < n.length ? (i[o] = n[e]) : s || (i[o] = null);
          }
          return i;
        }
        static parseType(e) {
          if (this.isStoriesRoute(e)) return _.STORY;
        }
        static parseData(e) {
          const t = this.parseType(e);
          if (!t) return null;
          const r = this.urlStructures[t];
          return this.parseUrlData(r, e);
        }
      }
      ((h.urlStructures = {
        [_.STORY]: "/stories/{username}/{?initial_media_id}/",
      }),
        (h.isStoriesRoute = (e) =>
          /^\/?stories\/[a-zA-Z0-9._]{3,}\/([\d]+)?\/?(?:[?&a-zA-Z0-9=%\-_.~])*?$/gs.test(
            e,
          )));
      new (class {
        constructor() {
          ((this.activeListeners = {}), (this.messageHandler = new c()));
          const e = {
            [s.STORY_INIT]: this.init,
            [s.STORY_REELS_DATA_FETCH]: this.getReelsTrayData,
            [s.STORY_UI_UPDATE]: this.handleUIChanges,
            [s.STORY_REEL_FETCH]: this.getReelData,
          };
          for (const t in e)
            e.hasOwnProperty(t) &&
              (this.activeListeners[t] = this.messageHandler.onMessage(
                t,
                e[t].bind(this),
              ));
        }
        init() {
          u.init();
        }
        getReelsTrayData() {
          u.getStoryReelsTray()
            .then((e) => {
              e
                ? this.messageHandler.sendMessage(s.STORY_REELS_TRAY, e)
                : n.error;
            })
            .catch((e) => {
              n.error;
            });
        }
        getReelData({ reel_id: e, media_id: t, all: r }) {
          u.getStoryReelMedia([e])
            .then((i) => {
              if (!i || i.length < 1) return void n.error;
              const o = i.reels[e].user,
                a = i.reels_media;
              this.messageHandler.sendMessage(s.STORY_REEL_MEDIA, {
                user: o,
                reel_id: e,
                all: r,
                items:
                  r || !t ? a[0].items : a[0].items.filter((e) => e.pk === t),
              });
            })
            .catch((e) => {
              n.error;
            });
        }
        handleUIChanges({ type: e }) {
          var t;
          let r = h.parseData(location.pathname);
          switch (e) {
            case o.ADD_DOWNLOAD_BUTTON:
              {
                if (document.getElementById("story-download-button")) return;
                const e = (() => {
                  var e;
                  const t = document.querySelector('[id^="mount_"]');
                  if (!t) return null;
                  let r;
                  const n = t.querySelectorAll(
                    'a[href]:has(>img[src]:not([alt*=" "])):not([href^="/stories/"])',
                  );
                  r =
                    n.length > 0
                      ? n.item(n.length - 1)
                      : t.querySelector(
                          'a[href]:has(>img[src]):not([href^="/stories/"])',
                        );
                  let i =
                    null !== (e = null == r ? void 0 : r.closest("header")) &&
                    void 0 !== e
                      ? e
                      : null == r
                        ? void 0
                        : r.closest(".x6s0dn4.x78zum5.x1xmf6yo");
                  return null == i ? void 0 : i.children[1];
                })();
                if (!e) return;
                if (
                  !r ||
                  ("highlights" !== r.username &&
                    !((e, t) => {
                      const r = u.getViewStoryStringParts(t);
                      if (e.parentElement) {
                        const t = document.evaluate(
                            `//div[@role='button' and .='${r.viewStory}']`,
                            e.parentElement.parentElement || document.body,
                            null,
                            XPathResult.ANY_UNORDERED_NODE_TYPE,
                            null,
                          ),
                          n = document.evaluate(
                            `//div[contains(., '${r.subtitleText}')]`,
                            e.parentElement.parentElement || document.body,
                            null,
                            XPathResult.ANY_UNORDERED_NODE_TYPE,
                            null,
                          );
                        if (
                          (null == t ? void 0 : t.singleNodeValue) ||
                          (null == n ? void 0 : n.singleNodeValue)
                        )
                          return !1;
                      }
                      return !0;
                    })(e, r))
                )
                  return;
                const t = document.createElement("div");
                ((t.id = "story-download-button"), (t.style.display = "flex"));
                const n = document.createElement("span");
                (n.classList.add("story-download-button"),
                  (n.title = "Download current story"),
                  (n.onclick = () => {
                    const e = h.parseData(location.pathname);
                    e &&
                      this.messageHandler.sendMessage(
                        s.STORY_DOWNLOAD,
                        Object.assign({ all: !1 }, e),
                      );
                  }));
                const i = document.createElement("span");
                (i.classList.add(
                  "story-download-button",
                  "story-download-all-button",
                ),
                  (i.title = "Download all stories"),
                  (i.onclick = () => {
                    const e = h.parseData(location.pathname);
                    e &&
                      this.messageHandler.sendMessage(
                        s.STORY_DOWNLOAD,
                        Object.assign({ all: !0 }, e),
                      );
                  }),
                  t.append(n, i),
                  e.children.length > 1
                    ? e.children[1].prepend(t)
                    : e.insertBefore(t, e.children[1] || e.lastChild));
              }
              break;
            case o.REMOVE_DOWNLOAD_BUTTON:
              null === (t = document.getElementById("story-download-button")) ||
                void 0 === t ||
                t.remove();
          }
        }
      })();
    })();
  })());
//# sourceMappingURL=inject.js.map
