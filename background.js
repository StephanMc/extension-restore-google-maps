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

    if (isDocumentLoaded && isGoogleSearchUrl(url) && !url.search.includes("gl=ch")) {
      url.searchParams.set("gl", "ch");

      chrome.tabs.update(details.tabId, { url: url.toString() }, function () {});
    } else if (isDocumentLoaded && isGoogleFlightUrl(url) && url.search.toLowerCase().includes("gl=ch")) {
      // When searching "Google Flights" on search, it appended by default "GL=ch" on flight results, making prices to appear in CHF.
      // Fix it by removing the parameter, to use the default currency.
      url.searchParams.delete("gl");
      url.searchParams.delete("GL");

      chrome.tabs.update(details.tabId, { url: url.toString() }, function () {});
    }
  },
  { url: [{ urlMatches: "https://www.google." }] }
);
