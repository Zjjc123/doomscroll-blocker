chrome.storage.local.get(['blockedSites'], function (result) {
  const blockedSites = result.blockedSites || [];
  const currentHostname = window.location.href;
  const isBlocked = blockedSites.some((site) => currentHostname.includes(site));

  if (isBlocked) {
    initialSiteBlocker();
  }
});

function initialSiteBlocker() {
  const CONFIG = {
    SCROLL_LIMIT: 4000,
    FLASH_INTERVAL: 400,
    SCREEN_DECAY_TIME: 7,
  };

  let scrollDistance = 0;
  let isWarningVisible = false;
  let isWarningEnabled = false;
  let flashIntervalId;

  const warningElement = createWarningElement();

  function createWarningElement() {
    const element = document.createElement('div');
    element.id = 'doomscroll';
    element.style = `
      height: 100%;
      position: fixed;
      width: 100%;
      z-index: 9000;
      display: flex;
      justify-content: center;
      flex-direction: column;
      color: #f94144;
      font-weight: bolder;
      text-align: center;
      font-size: 7vw;
      transition-property: opacity;
      transition-duration: 0.3s
    `;
    element.innerText = 'DOOMSCROLL!';
    return element;
  }

  const handleScroll = () => {
    const scrollDelta = document.documentElement.scrollTop - scrollDistance;
    scrollDistance = document.documentElement.scrollTop;

    if (scrollDelta > 0) {
      if (!isWarningEnabled && scrollDistance > CONFIG.SCROLL_LIMIT) {
        isWarningEnabled = true;

        document.body.insertAdjacentElement('afterbegin', warningElement);

        const children = document.body.children;
        for (child of children) {
          if (child.id != 'doomscroll') {
            child.style.opacity = 1;
            child.style.transitionProperty = 'opacity';
            child.style.transitionDuration = CONFIG.SCREEN_DECAY_TIME + 's';
          }
        }

        flashIntervalId = setInterval(() => {
          displayWarning();
        }, CONFIG.FLASH_INTERVAL);

        for (child of children) {
          if (child.id != 'doomscroll') child.style.opacity = 0;
        }

        const t = setTimeout(() => {
          document.body.innerHTML = '';

          clearInterval(flashIntervalId);

          document.body.appendChild(warningElement);
          warningElement.style.opacity = 1;
          warningElement.style.color = '#8ac926';
          warningElement.style.fontFamily = 'sans-serif';
          warningElement.innerText = 'Touch some grass!';

          clearTimeout(t);
        }, CONFIG.SCREEN_DECAY_TIME * 1000);
      }
    }
  };

  const displayWarning = () => {
    if (!isWarningVisible) {
      warningElement.style.opacity = 1;
    } else {
      warningElement.style.opacity = 0;
    }
    isWarningVisible = !isWarningVisible;
  };

  addEventListener('scroll', handleScroll);
}
