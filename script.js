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


// Read links in from local storage
if (localStorage.getItem("numLinks") === null) {
    localStorage.setItem("numLinks", "0");
} else {
    for (let i = 0; i<localStorage.getItem("numLinks"); i++){
        addLink(localStorage.getItem(`_Link${i}_link`), localStorage.getItem(`_Link${i}_name`))
    }
}

function addLink(new_link, new_link_name){
    // The icon as a whole
    let new_icon = document.createElement("td");
    new_icon.classList.add("icon-button");

    // The clickable button
    let new_button = document.createElement("button");
    new_button.onclick = function () {
        window.open(new_link, "_self");
    }

    let new_image = document.createElement("img");
    new_image.src = `https://www.google.com/s2/favicons?domain=${new_link}`

    new_button.appendChild(new_image);

    // The icon name
    let new_text = document.createElement("span");
    new_text.innerHTML = new_link_name;

    new_icon.appendChild(new_button);
    new_icon.appendChild(new_text);

    document.getElementById("icons").appendChild(new_icon);

}

function addNewLink(new_link, new_link_name) {
    if (new_link[0] == "_") return;
    if (new_link_name[0] == "_") return;

    addLink(new_link, new_link_name);

    // Localstorage
    var numLinks = +localStorage.getItem("numLinks");
    localStorage.setItem(`_Link${numLinks}_link`, new_link);
    localStorage.setItem(`_Link${numLinks}_name`, new_link_name);
    numLinks++;
    localStorage.setItem("numLinks", numLinks.toString());
}
