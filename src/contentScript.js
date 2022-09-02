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
  'height: 100%; position: fixed; width: 100% !important; z-index: 9000; display: flex; justify-content: center; flex-direction: column; color: red; font-weight: bolder; text-align: center; font-size: 10vw; z-index: 9000; transition-property: opacity; transition-duration: 0.3s';
warning.innerText = 'DOOMSCROLL DETECTED';

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

      flashID = setInterval(() => {
        displayWarning();
      }, FLASH_INTERVAL);
  

      for (child of children) {
        if (child.id != 'doomscroll') child.style.opacity = 0;
      }

      /*
      // After Fade
      const t = setTimeout(() => {
        document.body.html = '';
        
        clearInterval(flashID);

        document.body.appendChild(warning);
        warning.style.opacity = 1;
        warning.innerText = 'Touch some grass!';

        console.log("t")
        clearTimeout(t);
      }, SCREEN_DECAY_TIME * 1000);
      */
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
  console.log('inteval');
};
