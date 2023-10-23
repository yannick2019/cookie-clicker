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

