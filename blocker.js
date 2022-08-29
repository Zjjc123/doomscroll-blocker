const SCROLL_LIMIT = 4000;
const FLASH_INTERVAL = 400;
const SCREEN_DECAY_TIME = 7;

let scrollDistance = 0;

let warningOn = false;
let warningEnabled = false;

let flashID;

let wrap = document.createElement("div");
wrap.id = "wrap";

const warning = document.createElement("div");
warning.style =
"height: 100%; position: fixed; width: 100%; z-index: 9000; display: flex; justify-content: center; flex-direction: column;";
warning.innerHTML = `<h1 style="color: red; font-family: sans-serif; font-weight: bolder; text-align: center; font-size: 10vw; z-index: 9000;">DOOMSCROLL DETECTED</h1>`;

addEventListener("scroll", (e) => {
    const scrollDelta = document.documentElement.scrollTop - scrollDistance;
    scrollDistance = document.documentElement.scrollTop;
    
    if (scrollDelta > 0) {
        if (!warningEnabled && scrollDistance > SCROLL_LIMIT) {
            warningEnabled = true;
            
            // Wrap everything in a div
            while (document.body.firstChild) {
                wrap.appendChild(document.body.firstChild);
            }
            
            document.body.appendChild(wrap);
            
            // Decay Screen;
            wrap.style.opacity = 1;
            wrap.style.transitionProperty = "opacity";
            wrap.style.transitionDuration = SCREEN_DECAY_TIME + "s";
            
            // Create Warning
            document.body.insertAdjacentElement("afterbegin", warning);
            
            flashID = setInterval(() => {
                displayWarning();
            }, FLASH_INTERVAL);
            
            setTimeout(() => {
                document.body.removeChild(wrap);
                clearInterval(flashID);
            }, SCREEN_DECAY_TIME * 1000);
        }
    }
});

const displayWarning = () => {
    wrap.style.opacity = 0;

    if (!warningOn) {
        warning.style.visibility = "visible";
    } else {
        warning.style.visibility = "hidden";
    }
    warningOn = !warningOn;
};
