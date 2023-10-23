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

clickButton.addEventListener('click', () =>{
    score += multiplier;
    updateScore();
})

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
    autoClickButton.innerText = `Auto-Clicker x${autoClickers} ($${autoClickerCost})`;
}

autoClickButton.addEventListener('click', () => {
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



