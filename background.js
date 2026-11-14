// Shield Ad Blocker — service worker
// State: { enabled: boolean, allowlist: string[] } in chrome.storage.local

const DNR = chrome.declarativeNetRequest;

async function getState() {
  const { enabled = true, allowlist = [] } = await chrome.storage.local.get(["enabled", "allowlist"]);
  return { enabled, allowlist };
}

async function apply() {
  const { enabled, allowlist } = await getState();

  // Global on/off = enable/disable the static ruleset
  await DNR.updateEnabledRulesets(
    enabled ? { enableRulesetIds: ["ads"] } : { disableRulesetIds: ["ads"] }
  );

  // Per-site pause = allowAllRequests rule per allowed hostname (covers subframes too)
  const existing = await DNR.getDynamicRules();
  const addRules = allowlist.map((host, i) => ({
    id: i + 1,
    priority: 100,
    action: { type: "allowAllRequests" },
    condition: { requestDomains: [host], resourceTypes: ["main_frame", "sub_frame"] }
  }));
  await DNR.updateDynamicRules({ removeRuleIds: existing.map(r => r.id), addRules });

  // Badge shows number of blocked requests on the current tab
  await DNR.setExtensionActionOptions({ displayActionCountAsBadgeText: enabled });
  await chrome.action.setBadgeBackgroundColor({ color: "#1f6f5c" });
  await chrome.action.setBadgeTextColor?.({ color: "#ffffff" });
}

chrome.runtime.onInstalled.addListener(apply);
chrome.runtime.onStartup.addListener(apply);
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && (changes.enabled || changes.allowlist)) apply();
});
