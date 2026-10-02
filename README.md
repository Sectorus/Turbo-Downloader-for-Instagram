# Turbo Downloader for Instagram

A fixed fork of the Chrome/Brave extension **Turbo Downloader for Instagram** (forked from version 4.12.16, ID `cpgaheeihidjmolbakklolchdplenjai`).

## Fixes in this fork

- **Fixed "Could not find account. Are you signed in?" error**:
  - Intercept and cache `x-ig-www-claim` and `x-ig-app-id` dynamically from live requests instead of relying on legacy `PolarisWWWClaim` calls that threw infinite exceptions.
  - Added safe fallbacks for headers and profile extraction from DOM if `web_profile_info` fails.
- **Fixed bulk downloading ("Finding Posts" disappearing)**:
  - Replaced the deprecated `/api/v1/feed/user/...` endpoint with Instagram's internal Relay timeline query (`PolarisProfilePostsQuery`) via `CometRelay.fetchQuery`.
- **Bulk downloading Reels & Tagged images**:
  - "Download All" on the Reels tab (`/username/reels/`) fetches and downloads all user reels (including full MP4 video).
  - "Download All" on the Tagged tab (`/username/tagged/`) fetches and downloads all tagged images/carousels.
  - "Download All" on the profile page includes timeline posts, reels, and tagged posts without duplicates.
- **URL routing without trailing slashes**:
  - Profile and tab route matching now works whether URLs end with a slash or not (`/username`, `/username/reels`, `/username/tagged`).
- **UI update**:
  - Styled the "Download All" button as a primary Instagram-style blue button with white text.

## How to install

1. Open `chrome://extensions` or `brave://extensions`.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select this folder.
