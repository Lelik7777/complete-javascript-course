'use strict';
const getSecretNumber = () => {
    return Math.trunc(Math.random() * 20 + 1);
};

function decrease() {
    score--;
    $score.textContent = score;
}

function displayGame(color, width, value) {
    document.body.style.backgroundColor = color;
    $number.style.width = width;
    $number.textContent = value;
}

function createMessage(text) {
    $message.textContent = text;
}


//здесь я получаю интерактивную связь между кнопкой и инпутом,имея возможность
//доступа к актуальному значению инпута
const $btn = document.querySelector('.check');
const $message = document.querySelector('.message');
let $score = document.querySelector('.score');
let $highScore = document.querySelector('.highscore');
const $again = document.querySelector('.again');
const $number = document.querySelector('.number');

let score = 20;
let highScore = 0;
let secretNumber = getSecretNumber();


$again.addEventListener('click', () => {
    score = 20;
    $score.textContent = score;
    document.querySelector('.guess').value = null;
    createMessage('Start guessing...');
    secretNumber = getSecretNumber();
    displayGame('#222', '15rem', '?');

})
$btn.addEventListener('click', () => {
    const guess = +document.querySelector('.guess').value;
    if (!guess) {
        createMessage('⛔ No number');
        decrease();
    } else if (score <= 1) {
        createMessage('You lost. Try again');
    } else if (guess === secretNumber) {
        createMessage('🎉 You guess the number!');
        if (score > highScore) {
            highScore = score;
            $highScore.textContent = highScore;
        }
        displayGame('green', '30rem', secretNumber);
    } else if (guess !== secretNumber) {
        createMessage(guess > secretNumber ? 'too high' : 'too low');
        decrease();
    }

});
