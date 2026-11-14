const DEFAULT_STATE = { enabled: true, allowlist: [] };

async function getState() {
  const stored = await chrome.storage.local.get(["enabled", "allowlist"]);
  return {
    enabled: stored.enabled !== false,
    allowlist: Array.isArray(stored.allowlist) ? stored.allowlist : []
  };
}

async function updateBadge() {
  const { enabled } = await getState();
  await chrome.action.setBadgeText({ text: enabled ? "" : "OFF" });
  await chrome.action.setTitle({ title: enabled ? "Disrupt The Ads is on" : "Disrupt The Ads is off" });
}

chrome.runtime.onInstalled.addListener(updateBadge);
chrome.runtime.onStartup.addListener(updateBadge);
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && (changes.enabled || changes.allowlist)) {
    updateBadge();
  }
});
