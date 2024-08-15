const defaultSites = [
  'facebook.com',
  'twitter.com',
  'instagram.com',
  'reddit.com',
  'x.com',
  'youtube.com',
];

let sites = [];

function renderSiteList() {
  siteList.innerHTML = '';
  sites.forEach((site) => {
    const li = document.createElement('li');
    li.textContent = site;
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.dataset.site = site;
    li.appendChild(removeBtn);
    siteList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const siteInput = document.getElementById('siteInput');
  const addSiteBtn = document.getElementById('addSiteBtn');
  const siteList = document.getElementById('siteList');
  const saveSitesBtn = document.getElementById('saveSites');
  const cancelSitesBtn = document.getElementById('cancelSites');

  // Load the existing sites
  chrome.storage.local.get(['blockedSites'], function (result) {
    if (result.blockedSites) {
      sites = result.blockedSites;
    } else {
      sites = defaultSites;
    }
    renderSiteList();
  });

  // Add a site to the list
  addSiteBtn.addEventListener('click', function () {
    const site = siteInput.value.trim();
    if (site && !sites.includes(site)) {
      sites.push(site);
      siteInput.value = '';
      renderSiteList();
    }
  });

  // Remove a site from the list
  siteList.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
      const site = e.target.dataset.site;
      sites = sites.filter((s) => s !== site);
      renderSiteList();
    }
  });

  // Save the sites to storage and notify content script
  saveSitesBtn.addEventListener('click', function () {
    chrome.storage.local.set({ blockedSites: sites }, function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'updateSites',
          sites: sites,
        });
      });
      window.close();
    });
  });

  // Cancel and close the popup
  cancelSitesBtn.addEventListener('click', function () {
    window.close();
  });
});
