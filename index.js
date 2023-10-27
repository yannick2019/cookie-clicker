const cookieImage = document.getElementById("cookieImage");
const clickCount = document.getElementById("click-count");
const scoreElement = document.getElementById("score");
const clickButton = document.getElementById("clickButton");

let score = 0;
let multiplier = 1;

/**
 * Event listener for clicking the cookie image.
 */
cookieImage.addEventListener('click', () => {
    score += multiplier;
    updateScore();
});

/**
 * Updates the score displayed on the page and changes its color based on conditions.
 */
function updateScore() {

    scoreElement.textContent = score;
    if (score < autoClickerCost && score < multiplierPrice && score < bonusCost) {
        scoreElement.style.color = "red";
    } else {
        scoreElement.style.color = "green";
    }
}



// multiplier button

const multiplierButton = document.getElementById("multiplierButton");
const multiplierPriceLabel = document.getElementById("multiplier-price");
let multiplierPrice = 20;
let multiplierPurchaseCount = 0;


/**
 * Updates the displayed multiplier price.
 */

function updateMultiplierPrice() {
  multiplierPriceLabel.textContent = multiplierPrice;
}

/**
 * Updates the text and price on the multiplier button.
 */
function updateMultiplierButtonText() {
  multiplierButton.textContent = `Multiplier x${multiplier} ( x${
    multiplier + 1
  } Prix: $${multiplierPrice} )`;
}

/**
 * Increases the cost of the multiplier.
 */
function increaseMultiplierCost() {
  multiplierPrice = Math.ceil(multiplierPrice * 1.5);
  updateMultiplierPrice();
  multiplierPurchaseCount++;
}


/**
 * Event listener for clicking the multiplier button.
 */
multiplierButton.addEventListener('click', () => {
    if (score >= multiplierPrice) {
        score -= multiplierPrice; 
        multiplier += 1;
        increaseMultiplierCost();
        updateMultiplierButtonText(); 
        scoreElement.textContent = score; 
        multiplierButton.disabled = score < multiplierPrice;
    }
});

// Auto-clicker button and variables


const autoClickButton = document.getElementById('autoClickButton');
let autoClickers = 0;
let autoClickerCost = 50;
let autoClickInterval = null;

/**
 * Updates the text and price on the auto-clicker button.
 */
function updateAutoClickButtonText() {
  autoClickButton.innerText = `Auto-Clicker x${autoClickers} (x${
    autoClickers + 1
  } Prix: $${autoClickerCost})`;
}


/**
 * Event listener for clicking the auto-clicker button.
 */
autoClickButton.addEventListener('click', () => {
    if (score >= autoClickerCost) { 
        score -= autoClickerCost;   
        updateScore();
        autoClickers++;
        autoClickerCost += Math.ceil(autoClickerCost * 0.15);
        updateAutoClickButtonText();


    if (!autoClickInterval) {
      autoClickInterval = setInterval(() => {
        score += multiplier * autoClickers;
        updateScore();
      }, 1000);
    }
    autoClickButton.disabled = score < autoClickerCost;
  }
});

// design button

const buttons = document.querySelectorAll(".button");
/*
buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#72371b";
        button.style.color = "#fbd81a";
    });

    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#fbd81a";
        button.style.color = "#72371b";
    });
});
*/

// Bonus button
const bonusButton = document.getElementById("bonusButton"); 
const bonusPriceLabel = document.getElementById('bonus-price');
let bonusCost = 100; 
let bonusTime = 0;

/**
 * Increases the cost of the bonus.
 */

function increaseBonusCost() {
  bonusCost = Math.ceil(bonusCost * 1.5);
  bonusPriceLabel.textContent = bonusCost;
}


/**
 * Event listener for clicking the bonus button.
 */
bonusButton.addEventListener("click", () => {
  if (score >= bonusCost && bonusTime === 0) {
    score -= bonusCost;
    bonusTime = 30;
    increaseBonusCost();
    multiplier *= 2;
    bonusButton.textContent = `Bonus actif ( ${bonusTime}s )`;

    const bonusTimerInterval = setInterval(() => {
      if (bonusTime > 0) {
        bonusTime--;
        bonusButton.textContent = `Bonus actif ( ${bonusTime}s )`;
      } else {
        clearInterval(bonusTimerInterval);
        bonusButton.textContent = `Bonus (200%) - Prix: ${bonusCost}`;
        multiplier /= 2;
      }
    }, 1000);
    bonusButton.disabled = score < bonusCost;
  }
});



// Restart button

const resetButton = document.getElementById('resetButton');


/**
 * Event listener for clicking the reset button.
 */
resetButton.addEventListener("click", () => {

    score = 0;
    multiplier = 1;
    autoClickers = 0;
    autoClickerCost = 50;
    multiplierPrice = 20;
    if (autoClickInterval) {
        clearInterval(autoClickInterval);
        autoClickInterval = null;
    }
    bonusCost = 100;
    bonusTime = 0;
    multiplier = 1;

    updateScore();
    autoClickButton.innerText = `Auto-Clicker (Prix: $${autoClickerCost})`;
    multiplierButton.textContent = `Multiplier x${multiplier} (x${multiplier + 1} Prix: ${multiplierPrice} )`;
    bonusButton.textContent = `Bonus (200%) - Prix: ${bonusCost}`;

});

// Rotating cookie images

const cookieImages = document.getElementsByClassName("rotation");

/**
 * Rotates the cookie images in the DOM.
 */
function rotateImage() {
    for (let i = 0; i < cookieImages.length; i++) {
        let rotation =
        parseFloat(
            cookieImages[i].style.transform
            .replace("rotate(", "")
            .replace("deg)", "")
        ) || 0;
        rotation += 0.1;
        cookieImages[i].style.transform = `rotate(${rotation}deg)`;
    }
    requestAnimationFrame(rotateImage);
}

rotateImage();

// Navbar mobile

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

/**
 * Event listener for the hamburger icon to toggle the mobile menu.
 */
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

document.querySelectorAll(".nav-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
  })
);

// Dark mode

document.addEventListener("DOMContentLoaded", function () {

    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const header = document.querySelector("header");
    const clickContainer = document.querySelectorAll(".clicker-container");
    const menuMobile = document.querySelector(".menu");
    const bar = document.querySelectorAll(".bar");

    const isDarkMode = localStorage.getItem("darkMode") === "true";
  
    /**
     * Toggles the dark mode on or off.
     */
    function toggleDarkMode() {
      const isDarkMode = body.classList.contains("dark-mode");
      setMode(!isDarkMode);
    }

    /**
     *  Sets the mode (dark or light) for the application.
     * @param {boolean} isDarkMode - A boolean indicating whether to enable dark mode.
    */
    function setMode(isDarkMode) {
        if (isDarkMode) {
            // Dark mode styles
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
            
        } else {
            // Light mode styles
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

        }
    }
  
    // Event listener for toggling dark mode
    darkModeToggle.addEventListener("change", function () {
        toggleDarkMode();
    });
  
    setMode(isDarkMode);
});

/**
 * Checks the current score and enables or disables buttons accordingly.
 */
function checkScoreAndEnableButtons() {
  autoClickButton.disabled = score < autoClickerCost;
  autoClickButton.style.backgroundColor = autoClickButton.disabled
    ? "gray"
    : "#fbd81a";
  autoClickButton.style.color = autoClickButton.disabled
    ? "#D3D3D3"
    : "#72371b";

  multiplierButton.disabled = score < multiplierPrice;
  multiplierButton.style.backgroundColor = multiplierButton.disabled
    ? "gray"
    : "#fbd81a";
  multiplierButton.style.color = multiplierButton.disabled
    ? "#D3D3D3"
    : "#72371b";

  bonusButton.disabled = score < bonusCost;
  bonusButton.style.backgroundColor = bonusButton.disabled ? "gray" : "#fbd81a";
  bonusButton.style.color = bonusButton.disabled ? "#D3D3D3" : "#72371b";
}

checkScoreAndEnableButtons(); //initialise buttons status on page load

setInterval(checkScoreAndEnableButtons, 100); //checks every 0.1s (quick refresh
  

  //pop up instructions
  const instructionsButton = document.getElementById('instruction-btn');
  const closeInstructionsButton = document.getElementById('close-instructions');
  const instructionsPopup = document.getElementById('instructions-popup');
  
  instructionsButton.addEventListener('click', () => {
    instructionsPopup.style.display = 'block';
    setTimeout(() => {
      instructionsPopup.style.transform = 'translateY(-50%)';
    }, 10); // A small delay to allow the transition to work
  });

// JavaScript for the GDPR cookie banner and privacy policy

// Check if the user has previously accepted cookies
if (localStorage.getItem('cookiesAccepted') === 'true') {
  hideCookieBanner();
}

// Function to hide the cookie banner
function hideCookieBanner() {
  const cookieBanner = document.getElementById('cookie-banner');
  cookieBanner.style.display = 'none';
}

// Function to show the privacy policy section
function showPrivacyPolicy() {
  const privacyPolicySection = document.getElementById('privacy-policy');
  privacyPolicySection.style.display = 'block';
}
// Hide privacy policy section
function hidePrivacyPolicy() {
  const privacyPolicySection = document.getElementById('privacy-policy');
  privacyPolicySection.style.display = 'none';
}

// Function to accept cookies
function acceptCookies() {
  localStorage.setItem('cookiesAccepted', 'true');
  hideCookieBanner();
}

// Function to decline cookies
function declineCookies() {
  localStorage.setItem('cookiesAccepted', 'false');
  hideCookieBanner();
  showPrivacyPolicy(); // Show the privacy policy when cookies are declined
}

// Event listeners for the accept and decline buttons
document.getElementById('accept-cookies').addEventListener('click', acceptCookies);
document.getElementById('decline-cookies').addEventListener('click', declineCookies);

// Event listener for the privacy policy link
document.getElementById('privacy-policy-link').addEventListener('click', showPrivacyPolicy);

// Event listener for the close button
document.getElementById('close-privacy-policy').addEventListener('click', hidePrivacyPolicy);
  
  closeInstructionsButton.addEventListener('click', () => {
    instructionsPopup.style.transform = 'translateY(100%)';
    setTimeout(() => {
      instructionsPopup.style.display = 'none';
    }, 300); // The same duration as the transition
  });



