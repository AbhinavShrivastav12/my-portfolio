const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");

// Load saved mode
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
}

// Toggle theme
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const darkMode = document.body.classList.contains("dark-mode");

    // Toggle icons
    if (darkMode) {
        sunIcon.classList.remove("hidden");
        moonIcon.classList.add("hidden");
    } else {
        sunIcon.classList.add("hidden");
        moonIcon.classList.remove("hidden");
    }

    // Save state
    localStorage.setItem("darkMode", darkMode);
});
function goHome() {
    window.location.href="index.html"
}