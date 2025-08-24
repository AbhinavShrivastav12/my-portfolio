//for nav bar dynamic
fetch("components/nav.html")
.then(res => res.text())
.then(data => {
    document.getElementById("navbar").innerHTML = data;

    //Home logo click redirect to homepage
    window.goHome = () => {
        window.location.href = "index.html";
    }
     // Now query after nav has been injected
    const themeToggle = document.getElementById("themeToggle");
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");

    //save to into local storage
    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark-mode");
        sunIcon.classList.remove("hidden");
        moonIcon.classList.add("hidden")
    } else {
        sunIcon.classList.add("hidden");
        moonIcon.classList.remove("hidden");
    }
    //togle dark/light mode
    themeToggle.addEventListener("click" , () => {
        document.body.classList.toggle("dark-mode");

        //swap icons
        sunIcon.classList.toggle("hidden");
        moonIcon.classList.toggle("hidden");

        //save preferences
        if(document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme" , "dark");
        } else {
            localStorage.setItem("theme" , "light")
        }
    });
    //hightlight the actibe page link
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav ul li a ");

    navLinks.forEach(link => {
        if(
            link.getAttribute("href") === currentPage || 
            (currentPage === "" & link.getAttribute("href") === "index.html")
        ) {
            link.classList.add("active");
        }
    })
   })
  .catch(err => console.error("Error loading nav:", err));