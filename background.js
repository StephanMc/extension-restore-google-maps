/**
 * Copyright 2024 - Stéphane Kouadio
 * stephan.kouadio@gmail.com
 *
 */
function isGoogleSearchUrl(urlObject) {
  return urlObject.origin.startsWith("https://www.google.") && urlObject.pathname === "/search";
}

chrome.webNavigation.onBeforeNavigate.addListener(
  function (details) {
    const isDocumentLoaded =
      details.documentLifecycle === undefined /* Firefox, since not using Service worker */ ||
      details.documentLifecycle === "active"; /* Chromium */

    const url = new URL(details.url);

    if (isDocumentLoaded && isGoogleSearchUrl(url) && !url.search.includes("gl=ch")) {
      url.searchParams.set("gl", "ch");

      chrome.tabs.update(details.tabId, { url: url.toString() }, function () {});
    }
  },
  { url: [{ urlMatches: "https://www.google." }] }
);
