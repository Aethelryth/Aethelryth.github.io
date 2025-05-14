// Ensure the window is large enough (only checks on startup)
if (window.innerWidth < 800 || window.windowHeight < 500) {
    document.body.innerHTML = "<p>This website is meant for bigger screens.<\p>"
}


let openBoxCount = 0;

document.querySelectorAll('.icon-bar button').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('opens');
        const box = document.getElementById(targetId);

        if (box && box.style.display !== 'block') {
            const offset = openBoxCount * 30;
            box.style.top = `${100 + offset}px`;
            box.style.left = `${100 + offset}px`;
            box.style.display = 'block';
            openBoxCount = (openBoxCount + 1) % 10;
        }
    });
});


document.querySelectorAll('.Close').forEach(button => {
    button.addEventListener('click', function () {
        const box = this.closest('.draggable');
        if (box) {
            box.style.display = 'none';
        }
    });
});