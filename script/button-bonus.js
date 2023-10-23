const bonusButton = document.getElementById("bonusButton"); 
const bonusPriceLabel = document.getElementById('bonus-price');
let bonusCost = 100; 
let bonusDuration = 30; // Duration of the bonus in seconds
let bonusActive = false;
let bonusTimerInterval = null;


function increaseBonusCost() {
    bonusCost = Math.ceil(bonusCost * 1.5); // Increase the cost of the bonus upgrade
    bonusPriceLabel.textContent = bonusCost;
}

function enableBonus() {

    if (bonusActive) return;

    bonusActive = true;
    multiplier *= 2; // Double the click multiplier

    bonusTimerInterval = setInterval(() => {
        bonusDuration--;
        if (bonusDuration <= 0) {
            clearInterval(bonusTimerInterval);
            bonusActive = false;
            multiplier /= 2; // Reset the click multiplier
            bonusButton.textContent = `Acheter Bonus (Prix: ${bonusCost})`;
        } else {
            bonusButton.textContent = `Bonus Actif (${bonusDuration} sec)`;
        }
    }, 1000); // Update the timer every second

    setTimeout(() => {
        clearInterval(bonusTimerInterval);
        bonusActive = false;
        multiplier /= 2; // Reset the click multiplier
        bonusButton.textContent = `Acheter Bonus (Prix: ${bonusCost})`;
    }, bonusDuration * 1000); // Deactivate the bonus after the specified duration
}

bonusButton.addEventListener('click', () => {
    if (score >= bonusCost) {
        score -= bonusCost; // Deduct the price from the score
        increaseBonusCost(); // Increase the cost for the next purchase
        enableBonus(); 
        scoreElement.textContent = score; // Update the score and label
    }
});