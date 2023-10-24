const multiplierButton = document.getElementById("multiplierButton");
const multiplierPriceLabel = document.getElementById('multiplier-price');
let multiplierPrice = 100; // Set an initial price for the multiplier
let multiplierPurchaseCount = 0;


function updateMultiplierPrice() {
    multiplierPriceLabel.textContent = multiplierPrice;
}

function updateMultiplierButtonText() {
    multiplierButton.textContent = `Multiplier x${multiplier} ( x${multiplier + 1} prix ${multiplierPrice} )`;
}

function increaseMultiplierCost() {
    multiplierPrice = Math.ceil(multiplierPrice * 1.5); // Increase the cost exponentially
    updateMultiplierPrice(); // Update the price label
    multiplierPurchaseCount++; // Increment the multiplier purchase count
}

function checkScoreAndEnableButton() {
    // checks if score is enough to buy bonus button
    multiplierButton.disabled = score < multiplierPrice;
}

multiplierButton.addEventListener('click', () => {
    if (score >= multiplierPrice) {
        score -= multiplierPrice; // Deduct the price from the score
        multiplier += 1;
        increaseMultiplierCost();
        updateMultiplierButtonText(); 
        scoreElement.textContent = score; // Update the score and label
    }
});

checkScoreAndEnableButton(); //initialise autoclicker button status on page load

setInterval(checkScoreAndEnableButton, 100); //checks every 0.1s (quick refresh)