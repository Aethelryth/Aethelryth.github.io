if (localStorage.getItem("_bg") != null) {
    // Restore background from saved base64 string
    const savedDataUrl = localStorage.getItem("_bg");
    document.body.style.backgroundImage = `url(${savedDataUrl})`;
}

document.getElementById("bg_image").addEventListener("change", updateBG, false);
function updateBG() {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const dataUrl = e.target.result; // Base64 string
        document.body.style.backgroundImage = `url(${dataUrl})`;

        // Save to localStorage
        localStorage.setItem("_bg", dataUrl);
    };
    reader.readAsDataURL(file);
}

