'use strict';
console.log(document.querySelector('.message').textContent);
//document.querySelector('.message').textContent='hello,world';
let secretNumber = Math.trunc(Math.random() * 20 + 1);
//document.querySelector('.number').textContent = secretNumber.toString();

//здесь я получаю интерактивную связь между кнопкой и инпутом,имея возможность
//доступа к актуальному значению инпута
const $btn = document.querySelector('.check');
const $message = document.querySelector('.message');
let $score = document.querySelector('.score');
let $highScore = document.querySelector('.highscore');
const $again = document.querySelector('.again');
const $number = document.querySelector('.number');

let count = 20;

function decrease() {
    count--;
    $score.textContent = count;
}

$again.addEventListener('click', () => {
    count = 20;
    $score.textContent = count;
    document.querySelector('.guess').value = null;
    $message.textContent = 'Start guessing...';
    secretNumber = Math.trunc(Math.random() * 20 + 1);
    document.body.style.backgroundColor='#222';
    $number.style.width='15rem';
    $number.textContent='?';
})
$btn.addEventListener('click', () => {
    const guess = +document.querySelector('.guess').value;
    console.log(guess, typeof guess);
    if (!guess) {
        $message.textContent = '⛔ No number';
        decrease();
    } else if (count <= 1) {
        $message.textContent = 'You lost. Try again';
    } else if (guess === secretNumber) {
        $message.textContent = '🎉 You guess the number!';
        $highScore.textContent = +$highScore.textContent > count ? $highScore.textContent : count;
        document.body.style.backgroundColor = 'green';
        $number.textContent = secretNumber.toString();
        $number.style.width = '30rem';
    } else if (guess < secretNumber) {
        $message.textContent = 'too low';
        decrease();
    } else if (guess > secretNumber) {
        $message.textContent = 'too high';
        decrease();
    }

});
