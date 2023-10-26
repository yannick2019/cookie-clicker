document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const header = document.querySelector("header");
    const clickContainer = document.querySelectorAll(".clicker-container");
    const menuMobile = document.querySelector(".menu");
    const bar = document.querySelectorAll(".bar");
  
    // Function to toggle between dark and light mode
    function toggleDarkMode() {
      const isDarkMode = body.classList.contains("dark-mode");
      setMode(!isDarkMode);
    }
  
    // Function to set the mode (dark or light)
    function setMode(isDarkMode) {
      if (isDarkMode) {
        body.classList.add("dark-mode");
        document.body.style.color = "#fff";
        header.style.backgroundColor = "#212020";
        menuMobile.style.backgroundColor = "#212020";
        bar.forEach((element) => {
            element.style.backgroundColor = "#fbd81a";
        });
        clickContainer.forEach((element) => {
            element.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px;";
            element.style.backgroundColor = "#212020";
        });
        
        //localStorage.setItem("darkMode", "true");
      } else {
        body.classList.remove("dark-mode");
        document.body.style.color = "black";
        header.style.backgroundColor = "#dfe6e9";
        menuMobile.style.backgroundColor = "#dfe6e9";
        bar.forEach((element) => {
            element.style.backgroundColor = "#9a5738";
        });
        clickContainer.forEach((element) => {
            element.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px;";
            element.style.backgroundColor = "#fff";
        });

        //localStorage.setItem("darkMode", "false");
      }
    }
  
    // Add a click event listener to the dark mode toggle checkbox
    darkModeToggle.addEventListener("change", function () {
      toggleDarkMode();
    });
  
    const isDarkMode = localStorage.getItem("darkMode") === "true";
  
    // Set the initial mode based on the user's preference
    setMode(isDarkMode);
  });
  