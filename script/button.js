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
}

/**AUTOCLICK */
const autoClickButton = document.getElementById('autoClickButton');

let autoClickers = 0;
let autoClickerCost = 50;
let autoClickInterval = null;

function checkScoreAndEnableButton() {
    // checks if score is enough to buy auto-clicker
    autoClickButton.disabled = score < autoClickerCost;
}

function updateAutoClickButtonText() {
    autoClickButton.innerText = `Auto-Clicker x${autoClickers} (x${autoClickers + 1} Prix: $${autoClickerCost})`;
}

autoClickButton.addEventListener('click', () => {
    console.log("autoClick");
    if (score >= autoClickerCost) { //checks if the player has enough score to purchase it
        score -= autoClickerCost;   // the cost is deducted from the score, and the score is updated
        updateScore();

         // increase number of autoclickers and cost for the next purchase (15% rounded up).
        autoClickers ++;
        autoClickerCost += Math.ceil(autoClickerCost * 0.15 );
        updateAutoClickButtonText();

        // start auto-click interval
        if (!autoClickInterval) { 
            autoClickInterval = setInterval( () => { //starts interval to increment score by current multiplier
                score += multiplier * autoClickers;
                updateScore();
                checkScoreAndEnableButton(); // checks and enable button in real-time
            }, 1000); // auto-click every 1 second (= 1000ms)
        }
    }
});

checkScoreAndEnableButton(); //initialise autoclicker button status on page load

setInterval(checkScoreAndEnableButton, 100); //checks every 0.1s (quick refresh)

/*
const autoClickButton2 = document.getElementById('autoClickButton2');

let autoClickers2 = 0;
let autoClicker2Cost = 50;
let autoClick2Interval = null;

function checkScoreAndEnableButton2() {
    // checks if score is enough to buy auto-clicker 2
    autoClickButton2.disabled = score < autoClicker2Cost;
}

function updateAutoClickButton2Text() {
    autoClickButton2.innerText = `Auto-Clicker 2 x${autoClickers2} ($${autoClicker2Cost})`;
}

autoClickButton2.addEventListener('click', () => {
    if (score >= autoClicker2Cost) { //checks if the player has enough score to purchase it
        score -= autoClicker2Cost;   // the cost is deducted from the score, and the score is updated
        updateScore();

         // increase number of autoclickers and cost for the next purchase (15% rounded up).
        autoClickers2 ++;
        autoClicker2Cost += Math.ceil(autoClicker2Cost * 0.15 );
        updateAutoClickButton2Text();

        // start auto-click interval
        if (!autoClick2Interval) { 
            autoClick2Interval = setInterval( () => { //starts interval to increment score by current multiplier
                score += multiplier * autoClickers;
                updateScore();
                checkScoreAndEnableButton2(); // checks and enable button in real-time
            }, 1000); // auto-click every 1 second (= 1000ms)
        }
    }
});

checkScoreAndEnableButton2(); //initialise autoclicker button status on page load

setInterval(checkScoreAndEnableButton2, 100); //checks every 0.1s (quick refresh)

*/

