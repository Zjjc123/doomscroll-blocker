chrome.storage.local.get(['blockedSites'], function (result) {
  if (result.blockedSites) {
    blockedSites = result.blockedSites;
  }

  // Get the current site's hostname
  const currentHostname = window.location.hostname;

  // Check if the current site is in the blocked list
  const isBlocked = blockedSites.some((site) => currentHostname.includes(site));

  if (isBlocked) {
    initialSiteBlocker();
  }
});

function initialSiteBlocker() {
  const SCROLL_LIMIT = 4000;
  const FLASH_INTERVAL = 400;
  const SCREEN_DECAY_TIME = 7;

  let scrollDistance = 0;

  let warningOn = false;
  let warningEnabled = false;

  let flashID;

  const warning = document.createElement('div');
  warning.id = 'doomscroll';
  warning.style =
    'height: 100%; position: fixed; width: 100%; z-index: 9000; display: flex; justify-content: center; flex-direction: column; color: #f94144; font-weight: bolder; text-align: center; font-size: 7vw; z-index: 9000; transition-property: opacity; transition-duration: 0.3s';
  warning.innerText = 'DOOMSCROLL!';

  addEventListener('scroll', (e) => {
    const scrollDelta = document.documentElement.scrollTop - scrollDistance;
    scrollDistance = document.documentElement.scrollTop;

    if (scrollDelta > 0) {
      if (!warningEnabled && scrollDistance > SCROLL_LIMIT) {
        warningEnabled = true;

        // Create Warning
        document.body.insertAdjacentElement('afterbegin', warning);

        // Page Animation
        const children = document.body.children;
        for (child of children) {
          if (child.id != 'doomscroll') {
            child.style.opacity = 1;
            child.style.transitionProperty = 'opacity';
            child.style.transitionDuration = SCREEN_DECAY_TIME + 's';
          }
        }

        // Enable Flash
        flashID = setInterval(() => {
          displayWarning();
        }, FLASH_INTERVAL);

        for (child of children) {
          if (child.id != 'doomscroll') child.style.opacity = 0;
        }

        // After Fade
        const t = setTimeout(() => {
          document.body.innerHTML = '';

          clearInterval(flashID);

          document.body.appendChild(warning);
          warning.style.opacity = 1;
          warning.style.color = '#8ac926';
          warning.style.fontFamily = 'sans-serif';
          warning.innerText = 'Touch some grass!';

          clearTimeout(t);
        }, SCREEN_DECAY_TIME * 1000);
      }
    }
  });

  const displayWarning = () => {
    if (!warningOn) {
      warning.style.opacity = 1;
    } else {
      warning.style.opacity = 0;
    }
    warningOn = !warningOn;
  };
}
