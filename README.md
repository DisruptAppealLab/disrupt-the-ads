# Shield Ad Blocker

Shield is a customised build of **uBlock Origin Lite** (uBOL) by Raymond Hill,
the Manifest V3 version of uBlock Origin. All blocking is done by uBOL's engine
and its compiled filter lists: uBlock filters, EasyList, EasyPrivacy, Peter
Lowe's list, badware and URLhaus. Shield adds its own name, icon, interface
theme, a live "blocked on this page" counter, and defaults to uBOL's strongest
mode (Complete) on every site.

## Install (Chrome, Edge, Brave, Opera, Vivaldi)
1. Unzip this folder.
2. Open `chrome://extensions` and switch on **Developer mode**.
3. Click **Load unpacked** and choose the folder that contains `manifest.json`.
4. Pin the shield icon to your toolbar.

Reload any open tabs after installing. Filter lists update with each new
release of the extension (a limit of Manifest V3).

## Using it
- The popup shows how many requests were blocked on the current page.
- The slider sets protection for that site: Off, Basic, Optimal, Complete.
  If a site breaks, lower it one notch for that site only.
- Zapper (remove one element) and Picker (create a permanent hide rule) are in the popup.
- The settings page lets you turn on more lists (cookie notices, overlays,
  regional lists) and add your own filters.

## License and source
Shield is free software under the GNU GPL v3 (see LICENSE.txt), like uBOL.
Upstream source: https://github.com/gorhill/uBlock (platform/mv3).
Changes made by Shield: branding and locale names, icons, `css/shield-theme.css`,
the default filtering mode in `js/mode-manager.js`, one extra field in the popup
data in `js/background.js`, a counter appended to `js/popup.js`, and the popup
and dashboard HTML links. The upstream issue-report shortcut is hidden.
