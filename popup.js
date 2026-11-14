const $ = id => document.getElementById(id);
let tab, host, state = { enabled: true, allowlist: [] };

const isAllowed = () => state.allowlist.some(h => host === h || host.endsWith("." + h));

function render() {
  $("globalSwitch").setAttribute("aria-checked", state.enabled);
  $("globalSub").textContent = state.enabled ? "On for all sites" : "Off for all sites";

  const siteOk = !!host;
  $("siteRow").style.display = siteOk ? "" : "none";
  if (siteOk) {
    $("siteName").textContent = host;
    const on = state.enabled && !isAllowed();
    $("siteSwitch").setAttribute("aria-checked", on);
    $("siteSwitch").disabled = !state.enabled;
    $("siteSub").textContent = !state.enabled ? "Blocking is off globally"
      : on ? "Blocking is active" : "Paused on this site";
  }
}

async function refreshCount() {
  if (!tab) return;
  const text = await chrome.action.getBadgeText({ tabId: tab.id });
  const n = parseInt(text || "0", 10) || 0;
  $("count").textContent = n.toLocaleString();
  $("countLabel").textContent = n === 1 ? "request blocked on this page" : "requests blocked on this page";
}

async function init() {
  [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  try {
    const u = new URL(tab.url);
    if (/^https?:$/.test(u.protocol)) host = u.hostname.replace(/^www\./, "");
  } catch (_) {}
  const s = await chrome.storage.local.get(["enabled", "allowlist"]);
  state.enabled = s.enabled !== false;
  state.allowlist = s.allowlist || [];
  render();
  refreshCount();
  setInterval(refreshCount, 1000);
}

$("globalSwitch").addEventListener("click", async () => {
  state.enabled = !state.enabled;
  await chrome.storage.local.set({ enabled: state.enabled });
  render();
});

$("siteSwitch").addEventListener("click", async () => {
  state.allowlist = isAllowed()
    ? state.allowlist.filter(h => !(host === h || host.endsWith("." + h)))
    : [...state.allowlist, host];
  await chrome.storage.local.set({ allowlist: state.allowlist });
  render();
});

$("reload").addEventListener("click", () => { chrome.tabs.reload(tab.id); window.close(); });

init();
