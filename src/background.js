const defaultSites = [
  'facebook.com',
  'twitter.com',
  'instagram.com',
  'reddit.com',
  'x.com',
  'youtube.com',
];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(['blockedSites'], function (result) {
    if (!result.blockedSites) {
      chrome.storage.local.set({ blockedSites: defaultSites });
    }
  });
});

chrome.tabs.onUpdated.addListener(function listener(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, {
      action: 'checkBlockedSite',
      url: tab.url,
    });
  }
});
