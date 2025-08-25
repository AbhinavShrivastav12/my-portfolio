// reusable path resolver
function getPath(file) {
  if (window.location.pathname.includes("/pages/")) {
    return "../components/" + file;
  }
  return "components/" + file;
}

// Fetch navbar and footer
Promise.all([
  fetch(getPath("nav.html")).then(res => res.text()).then(data => {
    document.getElementById("navbar").innerHTML = data;

    // Home logo redirect
    window.goHome = () => (window.location.href = "index.html");

    // Theme toggle elements
    const themeToggle = document.getElementById("themeToggle");
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");

    // Load saved theme first (before showing content)
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
    } else {
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
    }

    // Toggle dark/light mode
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        sunIcon.classList.toggle("hidden");
        moonIcon.classList.toggle("hidden");

        localStorage.setItem(
          "theme",
          document.body.classList.contains("dark-mode") ? "dark" : "light"
        );
      });
    }

    // Highlight active page link
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
      if (
        link.getAttribute("href") === currentPage ||
        (currentPage === "" && link.getAttribute("href") === "index.html")
      ) {
        link.classList.add("active");
      }
    });
  }),

  fetch(getPath("footer.html")).then(res => res.text()).then(data => {
    document.getElementById("footer").innerHTML = data;
  })
])
.then(() => {
  // Both navbar and footer loaded=
  document.body.dataset.loading = "loaded";
})
.catch(err => console.error("Error loading components:", err));
//for config.json file
// Fetch config.json and apply links dynamically
fetch("../config.json")
  .then(response => response.json())
  .then(data => {
    // Update social links
    document.getElementById("github_url").href = data.github;
    document.getElementById("linkedin_url").href = data.linkedin;
    document.getElementById("email_url").href = data.email;
    document.getElementById("phone_url").href = data.phone;
  })
  .catch(error => console.error("Error loading config.json:", error));
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    subject: form.subject.value,
    message: form.message.value
  };

  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const result = await response.json();

  if (result.success) {
    alert("Message sent successfully!");
    form.reset();
  } else {
    alert("Error sending message: " + result.error);
  }
});
