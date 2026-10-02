# Turbo Downloader for Instagram (Fork)

This repository contains a local fork of the Chrome / Brave extension **Turbo Downloader for Instagram** (Extension ID: `cpgaheeihidjmolbakklolchdplenjai`).

## Overview

- **Source Extension ID:** `cpgaheeihidjmolbakklolchdplenjai`
- **Version:** `4.12.16`
- **Manifest Version:** 3
- **Primary Target:** `*://*.instagram.com/*`

## Architecture & Structure

```text
.
├── css/
│   ├── extension.css          # Styling injected into Instagram pages
│   └── options.css            # Styling for the options / settings page
├── icons/                     # Icons & SVG action buttons
│   ├── close_black_24dp.svg
│   ├── download_all_black.svg
│   ├── download_all_white.svg
│   ├── download_black.svg
│   ├── download_white.svg
│   ├── igdl2-128.png
│   └── igdl2.png
├── js/
│   ├── background.js          # Service worker handling download requests & events
│   ├── extension.js           # Content script injecting download buttons and UI
│   ├── inject.js              # Main world script injected at document_start
│   ├── options.js             # Options page logic and settings handlers
│   └── options_listener_inject.js # Script bridging options with Instagram tabs
├── manifest.json              # Extension manifest (MV3)
├── options.html               # Options page template
└── README.md
```

## How to Load and Test in Brave / Chrome

1. Open your browser and navigate to:
   - **Brave:** `brave://extensions`
   - **Chrome:** `chrome://extensions`
2. Turn ON **Developer mode** (toggle switch in the top right corner).
3. Click the **Load unpacked** button.
4. Select this directory:
   ```
   /home/stephan/Downloads/turbo-downloader-instagram
   ```
5. Reload the extension using the refresh icon whenever you make code changes.

### Note on Extension ID & Conflicts

- `manifest.json` contains the original public `"key"`, which pins the unpacked extension ID to `cpgaheeihidjmolbakklolchdplenjai`.
- **If you already have the Chrome Web Store version installed:** Chrome/Brave will not allow loading an unpacked extension with the same ID simultaneously. Either:
  1. **Disable or uninstall** the Chrome Web Store version before loading unpacked, OR
  2. **Remove the `"key"` property** from `manifest.json` to allow the browser to generate a separate, unique extension ID for this fork.

## Code Formatting

All JavaScript, CSS, HTML, and JSON files have been formatted with Prettier for readability and ease of editing.

To reformat changes:
```bash
npx prettier --write "**/*.{js,css,html,json}"
```

The initial Git commit (`feat: initial import from extension cpgaheeihidjmolbakklolchdplenjai v4.12.16`) preserves the exact raw files as extracted from the browser.
