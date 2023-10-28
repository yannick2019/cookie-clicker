const cookieImage = document.getElementById('cookieImage');
const clickCount = document.getElementById('click-count');
const scoreElement = document.getElementById('score');
const clickButton = document.getElementById('clickButton');
const openLog = document.getElementById("open-log");

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

// Actions box

/**
 * Create objects to store the log items for multiplier and auto-clicker
 */
const logItems = {
    multiplier: null,
    autoClicker: null,
    bonus: null,
};

/**
 * Function to log actions in the action log
 * @param { string } message 
 * @param { string } type 
 * @param { string } iconSrc 
 */ 
function logAction(message, type, iconSrc) {
    if (!logItems[type]) {
        logItems[type] = document.createElement('li');
        logList.appendChild(logItems[type]);
    }
    const icon = document.createElement('img');
    icon.src = iconSrc;
    icon.classList.add('action-icon'); 
    // Add the icon and message to the log item
    logItems[type].textContent = ''; 
    logItems[type].appendChild(icon);
    logItems[type].appendChild(document.createTextNode(message));
}

/**
 * Display the action log
 */
function displayActionLog() {
    actionLog.style.display = 'block';
}


// multiplier button

const multiplierButton = document.getElementById("multiplierButton");
const multiplierPriceLabel = document.getElementById('multiplier-price');
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
    multiplierButton.textContent = `Multiplier ( Prix: ${multiplierPrice} )`;
}

/**
 * Increases the cost of the multiplier.
 */
function increaseMultiplierCost() {
    multiplierPrice = Math.ceil(multiplierPrice * 1.5); 
    updateMultiplierPrice(); 
    multiplierPurchaseCount++; 
}

multiplierButton.addEventListener('click', () => {
    openLog.style.display = "none";
    const iconSrc = './assets/images/mine.png';
    if (score >= multiplierPrice) {
        score -= multiplierPrice; 
        multiplier += 1;
        increaseMultiplierCost();
        updateMultiplierButtonText(); 
        scoreElement.textContent = score; 
        multiplierButton.disabled = score < multiplierPrice;
        logAction(`Multiplier increased to ${multiplier}`, 'multiplier', iconSrc);
    }
});

/**AUTOCLICK */
const autoClickButton = document.getElementById('autoClickButton');

let autoClickers = 0;
let autoClickerCost = 50;
let autoClickInterval = null;

/**
 * Updates the text and price on the auto-clicker button.
 */
function updateAutoClickButtonText() {
    autoClickButton.innerText = `Auto-Clicker ( Prix: ${autoClickerCost} )`;
}

autoClickButton.addEventListener('click', () => {
    openLog.style.display = "none";
    const iconSrc = './assets/images/icons8-clicker-50.png';
    if (score >= autoClickerCost) { 
        score -= autoClickerCost;   
        updateScore();
        autoClickers ++;
        autoClickerCost += Math.ceil(autoClickerCost * 0.15 );
        updateAutoClickButtonText();
        if (!autoClickInterval) { 
            autoClickInterval = setInterval( () => { 
                score += multiplier * autoClickers;
                updateScore();
                //logAction('Auto Clicker clicked', 'autoClicker');
            }, 1000); 
        }
        autoClickButton.disabled = score < autoClickerCost;
        logAction(`Auto-click increased to ${autoClickers}`, 'autoClicker', iconSrc);
    }
});


// design button

const buttons = document.querySelectorAll(".button");

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

bonusButton.addEventListener('click', () => {
    openLog.style.display = "none";
    const iconSrc = './assets/images/clicker-icon-50.png';
    if (score >= bonusCost && bonusTime === 0) {
        score -= bonusCost;
        bonusTime = 30; 
        increaseBonusCost();        
        multiplier *= 2;
        bonusButton.textContent = `Bonus active ( ${bonusTime}s )`;
        
        const bonusTimerInterval = setInterval(() => {
            if (bonusTime > 0) {
                bonusTime--;
                bonusButton.textContent = `Bonus active ( ${bonusTime}s )`;
            } else {
                clearInterval(bonusTimerInterval); 
                multiplier /= 2;
                bonusButton.textContent = `Bonus (200%) - Prix: ${bonusCost}`;                
                logAction('Bonus expired', 'bonus', iconSrc);
            }
        }, 1000);
        bonusButton.disabled = score < bonusCost;
        logAction(`Bonus activated for ${bonusTime}s`, 'bonus', iconSrc );
    }
});


// Restart 

const resetButton = document.getElementById('resetButton');

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
    autoClickButton.innerText = `Auto-Clicker (Prix: ${autoClickerCost})`;
    multiplierButton.textContent = `Multiplier x${multiplier} (x${multiplier + 1} Prix: ${multiplierPrice} )`;
    bonusButton.textContent = `Bonus (200%) - Prix: ${bonusCost}`;
    location.reload();
    openLog.style.display = "block";
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


// navbar mobile

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
});

document.querySelectorAll(".nav-btn").forEach(btn => btn.
addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
}));


// dark mode

document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const header = document.querySelector("header");
    const clickContainer = document.querySelectorAll(".clicker-container");
    const menuMobile = document.querySelector(".menu");
    const bar = document.querySelectorAll(".bar");
    const popupMessage = document.getElementById("popup-message");
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
     * @param { boolean } isDarkMode - A boolean indicating whether to enable dark mode.
    */
    function setMode(isDarkMode) {
      if (isDarkMode) {
        // Dark mode styles
        body.classList.add("dark-mode");
        document.body.style.color = "#fff";
        popupMessage.style.color = "black";
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
    autoClickButton.style.backgroundColor = autoClickButton.disabled ? "gray" : "#fbd81a";
    autoClickButton.style.color = autoClickButton.disabled ? "#D3D3D3" : "#72371b";
  
    multiplierButton.disabled = score < multiplierPrice;
    multiplierButton.style.backgroundColor = multiplierButton.disabled ? "gray" : "#fbd81a";
    multiplierButton.style.color = multiplierButton.disabled ? "#D3D3D3" : "#72371b";
  
    bonusButton.disabled = score < bonusCost ;
    bonusButton.style.backgroundColor = bonusButton.disabled ? "gray" : "#fbd81a";
    bonusButton.style.color = bonusButton.disabled ? "#D3D3D3" : "#72371b";
}

/**
 * Function to show the pop-up with a message
 * @param { string } message 
 */
function showPopup(message) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    popupMessage.textContent = message;
    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
    }, 4000); // Hide after 3 seconds 
}

checkScoreAndEnableButtons(); //initialise buttons status on page load
  
setInterval(checkScoreAndEnableButtons, 100); //checks every 0.1s (quick refresh

displayActionLog();
  
