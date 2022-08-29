const SCROLL_LIMIT = 3000;
let scrollDistance = 0;

addEventListener("scroll", (e) => {
    const scrollDelta = document.documentElement.scrollTop - scrollDistance;
    scrollDistance = document.documentElement.scrollTop;
    console.log(scrollDelta)
    if (scrollDelta > 0) {
        if (scrollDistance > SCROLL_LIMIT) {
            alert("DOOMSCROLL DETECTED");
        }
    }
});
