
let multiplierCost = 100;

const multiplierButton = document.getElementById("multiplierButton");

multiplierButton.addEventListener("click", () => {
  if (score >= multiplierCost) {
    score -= multiplierCost;
    multiplier *= 2;
    multiplierCost *= 3;
    updateScore();
    updateMultiplierButton();
  }
});

function updateMultiplierButton() {
  multiplierButton.textContent = `Multiplier x${multiplier} ($${multiplierCost})`;
}
