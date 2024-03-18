/**
 * Copyright 2024 - Stéphane Kouadio
 * stephan.kouadio@gmail.com
 *
 */
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    let url = new URL(details.url);

    if (!url.searchParams.has("gl")) {
      url.searchParams.set("gl", "ch");
      return { redirectUrl: url.href };
    }
  },
  {
    urls: [
      "https://www.google.ad/search*",
      "https://www.google.at/search*",
      "https://www.google.ba/search*",
      "https://www.google.be/search*",
      "https://www.google.bg/search*",
      "https://www.google.by/search*",
      "https://www.google.ch/search*",
      "https://www.google.co.jp/search*",
      "https://www.google.co.uk/search*",
      "https://www.google.com.au/search*",
      "https://www.google.com.ua/search*",
      "https://www.google.com/search*",
      "https://www.google.cy/search*",
      "https://www.google.cz/search*",
      "https://www.google.de/search*",
      "https://www.google.dk/search*",
      "https://www.google.ee/search*",
      "https://www.google.es/search*",
      "https://www.google.fi/search*",
      "https://www.google.fr/search*",
      "https://www.google.gr/search*",
      "https://www.google.hr/search*",
      "https://www.google.hu/search*",
      "https://www.google.ie/search*",
      "https://www.google.is/search*",
      "https://www.google.it/search*",
      "https://www.google.li/search*",
      "https://www.google.lt/search*",
      "https://www.google.lu/search*",
      "https://www.google.lv/search*",
      "https://www.google.mc/search*",
      "https://www.google.md/search*",
      "https://www.google.me/search*",
      "https://www.google.mk/search*",
      "https://www.google.mt/search*",
      "https://www.google.nl/search*",
      "https://www.google.no/search*",
      "https://www.google.pl/search*",
      "https://www.google.pt/search*",
      "https://www.google.ro/search*",
      "https://www.google.rs/search*",
      "https://www.google.se/search*",
      "https://www.google.si/search*",
      "https://www.google.sk/search*",
      "https://www.google.sm/search*",
    ],
  },
  ["blocking"]
);
