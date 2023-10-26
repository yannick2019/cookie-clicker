resetButton.addEventListener("click", () => {
  // Reset all game-related variables and elements
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
  checkScoreAndEnableButton();
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

rotateImage(); // Start the rotation
