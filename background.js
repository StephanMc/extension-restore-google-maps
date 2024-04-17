/**
 * Copyright 2024 - Stéphane Kouadio
 * stephan.kouadio@gmail.com
 *
 */
function isGoogleSearchUrl(urlObject) {
  return urlObject.origin.startsWith("https://www.google.") && urlObject.pathname === "/search";
}

function isGoogleFlightUrl(urlObject) {
  return urlObject.origin.startsWith("https://www.google.") && urlObject.pathname.startsWith("/travel/flights");
}

chrome.webNavigation.onBeforeNavigate.addListener(
  function (details) {
    const isDocumentLoaded =
      details.documentLifecycle === undefined /* Firefox, since not using Service worker */ ||
      details.documentLifecycle === "active"; /* Chromium */

    const url = new URL(details.url);
    const tbm = url.searchParams.get("tbm");

    const isShopTab = (tbm === "shop");

    if (isDocumentLoaded && isGoogleSearchUrl(url)) {
      if (!isShopTab && !url.search.includes("gl=ad")) {
        url.searchParams.set("gl", "ad");

        chrome.tabs.update(details.tabId, { url: url.toString() }, function () {});
      } else if (isShopTab && url.search.includes("gl=ad")) {
        url.searchParams.delete("gl");
        chrome.tabs.update(details.tabId, { url: url.toString() }, function () {});
      }
    }
  },
  { url: [{ urlMatches: "https://www.google." }] }
);
