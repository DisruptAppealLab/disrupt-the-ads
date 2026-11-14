# Disrupt The Ads

Disrupt The Ads is a browser extension project designed to block intrusive ads and keep the browsing experience cleaner and more focused.

This repository contains the extension package and setup materials for installation and local testing. The project is intended for Chrome and Chromium-based browsers that support Manifest V3 extensions.

## Highlights
- Ad blocking focused on common ad containers and video ad behavior
- Site-level pause controls
- Simple popup toggle for global blocking
- Browser extension packaging ready for local install

## Repository contents
- `shield.zip` — packaged extension bundle for download and installation
- `manifest.json` — browser extension manifest
- `background.js` — extension background logic
- `content.js` — page-level ad blocking and cleanup behavior
- `popup.html` / `popup.js` — browser popup UI
- Additional extension files for HTML, CSS, dashboards, and rule support

## Download and install

### Option 1: Install from the ZIP archive
1. Download `shield.zip` from this repository.
2. Extract the ZIP to a folder on your computer.
3. Open your browser and navigate to:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
4. Turn on Developer mode.
5. Click `Load unpacked`.
6. Select the extracted extension folder.
7. The extension should appear in your browser toolbar.

### Option 2: Use the source files directly
1. Clone this repository.
2. Open the project folder containing `manifest.json`.
3. Follow the same Chrome/Edge `Load unpacked` steps above.

## Using the extension
- Toggle global blocking from the extension popup.
- Pause blocking on a specific site if needed.
- Reload tabs after changes if you want to refresh the ad-blocking state.

## Recommended workflow
For a clean release workflow:
1. Keep the packaged ZIP as the download artifact.
2. Update the source files in the repo.
3. Rebuild or repackage the ZIP before release.
4. Keep the README and install instructions in sync with the latest version.

## Notes
- This project is intended for local development and browser testing.
- Chrome/Chromium-based browsers are the recommended installation target.
- If you plan to distribute it publicly, it is a good idea to add screenshots, branding assets, and a landing page.

## License
This project includes a license file in the repository. Please review the license before distribution or reuse.
