const bonusButton = document.getElementById("bonusButton"); 
const bonusPriceLabel = document.getElementById('bonus-price');
let bonusCost = 100; 
let bonusTime = 0;
let originalMultiplier = 1; // Store the original multiplier value


function increaseBonusCost() {
    bonusCost = Math.ceil(bonusCost * 1.5); // Increase the cost of the bonus upgrade
    bonusPriceLabel.textContent = bonusCost;
}

function checkScoreAndEnableButton() {
    // checks if score is enough to buy bonus button
    bonusButton.disabled = score < bonusCost;
}

bonusButton.addEventListener('click', () => {
    if (score >= bonusCost && bonusTime === 0) {
        score -= bonusCost;
        bonusTime = 30; // Set the bonus duration to 30 seconds
        increaseBonusCost();        
        multiplier *= 2;
        bonusButton.textContent = `Bonus actif ( ${bonusTime}s )`;
        
        // Start the bonus timer
        const bonusTimerInterval = setInterval(() => {
            if (bonusTime > 0) {
                bonusTime--;
                bonusButton.textContent = `Bonus actif ( ${bonusTime}s )`;
            } else {
                clearInterval(bonusTimerInterval); // Stop the timer when the bonus ends
                bonusButton.textContent = `Bonus (200%) - Prix: ${bonusCost}`;
                multiplier = originalMultiplier; // Reset the click multiplier
            }
        }, 1000);
    }
});

checkScoreAndEnableButton(); //initialise autoclicker button status on page load

setInterval(checkScoreAndEnableButton, 100); //checks every 0.1s (quick refresh)