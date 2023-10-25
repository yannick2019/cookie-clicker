/* Light mode / Dark mode */
const aside = document.querySelector("aside");
const header = document.querySelector("header");
const mode = document.getElementById("switch-mode-btn");
const clickContainer = document.querySelector(".clicker-container");
const menuMobile = document.querySelector(".menu");
const bar = document.querySelectorAll(".bar");

let nightMode = false;

const switchMode = () => {
    nightMode = !nightMode;
    if (nightMode) {
        document.body.style.backgroundColor = "rgb(53, 54, 58)";
        document.body.style.color = "#fff";
        mode.textContent = "Light Mode";
        header.style.backgroundColor = "#212020";
        menuMobile.style.backgroundColor = "#212020";
        bar.forEach((element) => {
            element.style.backgroundColor = "#fbd81a";
        });
        clickContainer.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px;";
        clickContainer.style.backgroundColor = "#212020";
    } else {
        document.body.style.backgroundColor = "#fff";
        document.body.style.color = "black";
        mode.textContent = "Dark Mode";
        header.style.backgroundColor = "#dfe6e9";
        menuMobile.style.backgroundColor = "#dfe6e9";
        bar.forEach((element) => {
            element.style.backgroundColor = "#9a5738";
        });
        header.style.boxShadow = "0 4px 2px -2px rgba(0, 0, 0, 0.2)";
        clickContainer.style.backgroundColor = "#fff";
    }
}

document.getElementById("switch-mode-btn").addEventListener("click", switchMode);