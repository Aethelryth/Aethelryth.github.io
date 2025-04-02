// Function to execute code based on the hash
function handleHashChange() {
    // Get the current hash from the URL 
    const hash = window.location.hash;
    if (hash != "#game") {
        endGame();
    }
    if (hash === "#home") {
        document.getElementById("content").innerHTML = "I hope to have something cool here to show someday!";
    } else if (hash === "#index") {
        document.getElementById("content").innerHTML = "I want so many things they'll have to be organised...";
    } else if (hash === "#game") {
        document.getElementById("content").innerHTML = "Reload the page, and the squares will be put at different random parts of the canvas!";
        startGame();
    } else {
        console.log("No specific hash or unknown hash", hash);    // Debug output for unknown hashes
        window.location.href = "#home";
    }
}

window.onload = handleHashChange;
window.addEventListener('hashchange', handleHashChange);
