// Function to execute code based on the hash
function handleHashChange() {
    // Get the current hash from the URL 
    const hash = window.location.hash;

    if (hash === "#home") {
        document.getElementById("content").innerHTML = "I hope to have something cool here to show someday!";
    } else if (hash === "#index") {
        document.getElementById("content").innerHTML = "I want so many things they'll have to be organised...";
    } else {
        console.log("No specific hash or unknown hash");    // Debug output for unknown hashes
        window.location.href = "#home";
    }
}

window.onload = handleHashChange;
window.addEventListener('hashchange', handleHashChange);