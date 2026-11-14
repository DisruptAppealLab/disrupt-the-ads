// Shield Ad Blocker — cosmetic filtering + video ad handling
(async () => {
  const host = location.hostname.replace(/^www\./, "");
  let state;
  try {
    state = await chrome.storage.local.get(["enabled", "allowlist"]);
  } catch (_) { return; }
  const enabled = state.enabled !== false;
  const allow = state.allowlist || [];
  if (!enabled || allow.some(h => host === h || host.endsWith("." + h))) return;

  // ---- 1. Hide leftover ad containers --------------------------------
  const selectors = [
    // Google / generic ad slots
    "ins.adsbygoogle", "[id^='google_ads_']", "[id^='div-gpt-ad']", "[id*='dfp-ad']",
    "iframe[src*='doubleclick.net']", "iframe[src*='googlesyndication.com']",
    "iframe[id^='google_ads_iframe']", "[data-ad-slot]", "[data-ad-client]",
    // Common class/id conventions
    ".adsbox", ".ad-banner", ".ad-container", ".ad-wrapper", ".ad-slot", ".ad-unit",
    ".advert", ".advertisement", ".advertising", ".ads-container", ".ads-wrapper",
    ".banner-ad", ".banner-ads", ".sponsored-ad", ".sponsor-ad", ".top-ad", ".bottom-ad",
    "[class^='ad-'][class*='-container']", "[id^='ad-container']", "[id^='ad_']",
    "[aria-label='advertisement' i]", "[aria-label='Ads' i]", "[data-testid='ad']",
    // Native ad widgets
    ".taboola", "[id^='taboola-']", ".trc_related_container", ".OUTBRAIN", "[data-widget-id^='AR_']",
    ".ob-widget", "[id^='outbrain']", ".mgid", "[id^='mgid_']", "[id^='M_ID']",
    // Sticky/overlay junk
    ".adblock-notice", ".adblock-overlay", "#adblock-modal",
    // YouTube
    "#player-ads", "#masthead-ad", "ytd-ad-slot-renderer", "ytd-banner-promo-renderer",
    "ytd-promoted-sparkles-web-renderer", "ytd-display-ad-renderer", "ytd-in-feed-ad-layout-renderer",
    "ytd-rich-item-renderer:has(ytd-ad-slot-renderer)", ".ytp-ad-overlay-container",
    "ytd-companion-slot-renderer", "#related ytd-promoted-video-renderer",
    // Social promoted
    "[data-testid='placementTracking']"
  ];
  const style = document.createElement("style");
  style.id = "shield-cosmetic";
  style.textContent = selectors.join(",\n") + " { display: none !important; }";
  (document.head || document.documentElement).appendChild(style);

  // ---- 2. YouTube: skip / fast-forward video ads -----------------------
  if (/(^|\.)youtube\.com$/.test(location.hostname)) {
    const tick = () => {
      const player = document.querySelector(".html5-video-player");
      const video = document.querySelector("video.html5-main-video");
      const adShowing = player?.classList.contains("ad-showing");
      if (adShowing && video) {
        video.muted = true;
        if (isFinite(video.duration) && video.duration > 0) video.currentTime = video.duration;
        video.playbackRate = 16;
      }
      document.querySelectorAll(
        ".ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button, .ytp-ad-overlay-close-button"
      ).forEach(b => b.click());
    };
    new MutationObserver(tick).observe(document.documentElement, { childList: true, subtree: true });
    setInterval(tick, 400);
  }
})();
