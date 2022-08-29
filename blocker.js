const SCROLL_LIMIT = 3000;
let scrollDistance = 0;
let warningOn = false;

addEventListener("scroll", (e) => {
    const scrollDelta = document.documentElement.scrollTop - scrollDistance;
    scrollDistance = document.documentElement.scrollTop;
    console.log(scrollDelta)
    if (scrollDelta > 0) {
        if (scrollDistance > SCROLL_LIMIT) {
            displayWarning()
        }
    }
});


const displayWarning = () => {
    if (!warningOn) {
        const warning = document.createElement('div');
        warning.style = "height: 100%; position: fixed; width: 100%; z-index: 9000; display: flex; justify-content: center; flex-direction: column;"
        warning.innerHTML = `<h1 style="color: red; font-family: sans-serif; font-weight: bolder; text-align: center; font-size: 10vw; z-index: 9000;">DOOMSCROLL DETECTED</h1>`;
        document.body.insertAdjacentElement('afterbegin', warning);
        warningOn = true;
    }
}