const resetButton = document.getElementById("resetButton"); // Added reset button

// Event listener for the reset button
resetButton.addEventListener("click", () => {
  // Reset all game-related variables and elements
  score = 0;

  updateScore();
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
    rotation += 0.5;
    cookieImages[i].style.transform = `rotate(${rotation}deg)`;
  }
  requestAnimationFrame(rotateImage);
}

rotateImage(); // Start the rotation
