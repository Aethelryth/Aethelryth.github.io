// Function to execute code based on the hash
function handleHashChange() {
    // Get the current hash from the URL 
    const hash = window.location.hash;
    if (hash != "#game") {
        endGame();
    }
    if (hash === "#home") {
        document.getElementById("content").innerHTML = "<p>I hope to have something cool here to show someday!</p>";
    } else if (hash === "#index") {
        document.getElementById("content").innerHTML = "<p>I want so many things they'll have to be organised...</p>";
    } else if (hash === "#game") {
        document.getElementById("content").innerHTML = "<p>Reload the page for a fun visual of my current progress on this brain trainer game!</p>";
        startGame();
    } else {
        console.log("No specific hash or unknown hash", hash);    // Debug output for unknown hashes
        window.location.href = "#home";
    }
}

window.onload = handleHashChange;
window.addEventListener('hashchange', handleHashChange);
