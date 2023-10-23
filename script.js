const cookieImage = document.getElementById('cookieImage');
const clickCount = document.getElementById('click-count');
const scoreElement = document.getElementById('score')


let score = 0;
let multiplier = 1;
let autoClickerCost = 50;
let bonusCost = 100;

cookieImage.addEventListener('click', () => {
    score += multiplier;
    updateScore();
});

function updateScore(){
    scoreElement.textContent = score;
}

