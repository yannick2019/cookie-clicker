const cookieImage = document.getElementById('cookieImage');
const clickCount = document.getElementById('click-count');
const scoreElement = document.getElementById('score');
const clickButton = document.getElementById('clickButton');

let score = 0;
let multiplier = 1;

cookieImage.addEventListener('click', () => {
    score += multiplier;
    updateScore();
});

function updateScore(){
    scoreElement.textContent = score;
    if (score < 50) {
        scoreElement.style.color = "red";
    } else {
        scoreElement.style.color = "green";
    }
}



// multiplier button
const multiplierButton = document.getElementById("multiplierButton");
const multiplierPriceLabel = document.getElementById('multiplier-price');
let multiplierPrice = 20; 
let multiplierPurchaseCount = 0;


function updateMultiplierPrice() {
    multiplierPriceLabel.textContent = multiplierPrice;
}

function updateMultiplierButtonText() {
    multiplierButton.textContent = `Multiplier x${multiplier} ( x${multiplier + 1} Prix: $${multiplierPrice} )`;
}

function increaseMultiplierCost() {
    multiplierPrice = Math.ceil(multiplierPrice * 1.5); 
    updateMultiplierPrice(); 
    multiplierPurchaseCount++; 
}

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

/**AUTOCLICK */
const autoClickButton = document.getElementById('autoClickButton');

let autoClickers = 0;
let autoClickerCost = 50;
let autoClickInterval = null;

function updateAutoClickButtonText() {
    autoClickButton.innerText = `Auto-Clicker x${autoClickers} (x${autoClickers + 1} Prix: $${autoClickerCost})`;
}

autoClickButton.addEventListener('click', () => {
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
            }, 1000); 
        }
        autoClickButton.disabled = score < autoClickerCost;
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


function increaseBonusCost() {
    bonusCost = Math.ceil(bonusCost * 1.5); 
    bonusPriceLabel.textContent = bonusCost;
}

bonusButton.addEventListener('click', () => {
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


// Restart 
const resetButton = document.getElementById('resetButton');

resetButton.addEventListener("click", () => {
  score = 0;
  multiplier = 1;
  autoClickers = 0;
  autoClickerCost = 50;
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

const cookieImages = document.getElementsByClassName("rotation");

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
  

    function toggleDarkMode() {
      const isDarkMode = body.classList.contains("dark-mode");
      setMode(!isDarkMode);
    }

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

      }
    }
  
    darkModeToggle.addEventListener("change", function () {
      toggleDarkMode();
    });
  
    const isDarkMode = localStorage.getItem("darkMode") === "true";
  
    setMode(isDarkMode);
  });

  function checkScoreAndEnableButtons() {
    // checks if score is enough to buy buttons
    autoClickButton.disabled = score < autoClickerCost;
    multiplierButton.disabled = score < multiplierPrice;
    bonusButton.disabled = score < bonusCost;
  }
  checkScoreAndEnableButtons(); //initialise buttons status on page load
  
  setInterval(checkScoreAndEnableButtons, 100); //checks every 0.1s (quick refresh
  
