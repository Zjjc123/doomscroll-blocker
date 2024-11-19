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
  const siteList = document.getElementById('siteList');
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
  const saveSitesBtn = document.getElementById('saveSites');
  const cancelSitesBtn = document.getElementById('cancelSites');

  chrome.storage.local.get(['blockedSites'], function (result) {
    if (!result.hasOwnProperty('blockedSites')) {
      chrome.storage.local.set({ blockedSites: defaultSites }, function () {
        if (chrome.runtime.lastError) {
          console.error(
            'Error initializing blockedSites:',
            chrome.runtime.lastError
          );
        }
      });
    }

    try {
      sites = result.blockedSites;
      renderSiteList();
    } catch (error) {
      console.error('Error loading sites:', error);
    }
  });

  addSiteBtn.addEventListener('click', function () {
    const site = siteInput.value.trim().toLowerCase();
    if (!site) return;

    if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(site)) {
      alert('Please enter a valid domain (e.g., example.com)');
      return;
    }

    if (!sites.includes(site)) {
      sites.push(site);
      siteInput.value = '';
      renderSiteList();
    }
  });

  siteList.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
      const site = e.target.dataset.site;
      sites = sites.filter((s) => s !== site);
      renderSiteList();
    }
  });

  saveSitesBtn.addEventListener('click', function () {
    chrome.storage.local.set({ blockedSites: sites }, function () {
      if (chrome.runtime.lastError) {
        console.error('Error saving sites:', chrome.runtime.lastError);
        return;
      }
    });
  });

  cancelSitesBtn.addEventListener('click', function () {
    window.close();
  });
});
