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
