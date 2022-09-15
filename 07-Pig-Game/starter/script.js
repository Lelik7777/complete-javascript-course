'use strict';

const $btnNewGame = document.querySelector('.btn--new');
const $btnRoll = document.querySelector('.btn--roll');
const $btnHold = document.querySelector('.btn--hold');
const $player_0 = document.querySelector('.player--0');
const $player_1 = document.querySelector('.player--1');
const $dice = document.querySelector('.dice');
const $score_0 = document.querySelector('#score--0');
const $score_1 = document.querySelector('#score--1');
const $current_0 = document.querySelector('#current--0');
const $current_1 = document.querySelector('#current--1');
const arrPlayers = [$player_0, $player_1];
const arrScoreElem = [$score_0, $score_1];
let current_0 = 0;
let current_1 = 0;
let score_0 = 0;
let score_1 = 0;
const active = 'player--active';
const hidden = 'hidden';
let activePlayer = 0;

function getRandomNum() {
    return Math.trunc(Math.random() * 6 + 1);
}

const removeActive = (playerNum) => {
    switch (playerNum) {
        case 0:
            arrPlayers[0].classList.remove(active);
            break;
        case 1:
            arrPlayers[1].classList.remove(active);
            break;
        default:
            console.error(`not ${playerNum} - only 0 or 1`);
    }
}
const addActive = (playerNum) => {
    if (playerNum >= 0 && playerNum <= 1) {
        console.log(playerNum);
        playerNum ? arrPlayers[1].classList.add(active) :
            arrPlayers[0].classList.add(active);
    } else console.error(`not ${playerNum} - only 0 or 1`);
}
const showDice = (num) => {
    $dice.src = `dice-${num}.png`;
    console.log($dice.src);
    $dice.classList.remove(hidden);
}

function getNewGame(arr) {
    arr.forEach(x => {
        x.textContent = '0';
        if (x === $dice) x.classList.add(hidden);
    });
    $player_0.classList.add(active);
    $dice.classList.add(hidden);
}

const currentToZero = (numPlayer) => {
    numPlayer ? $current_1.textContent = 0 : $current_0.textContent = 0;
}

function sumCurrent(num, numPlayer) {
    if (numPlayer) {
        current_1 += num;
        $current_1.textContent = current_1;
    } else {
        current_0 += num;
        $current_0.textContent = current_0;
    }
}

function sumScore(num, player) {
    if (player) {
        score_1 += num;
        $score_1.textContent = score_1;
    } else {
        score_0 += num;
        $score_0.textContent = score_0;
    }
}

function hold1() {
    if ($player_0.classList.contains(active)) {
        removeActive(0);
        addActive(1);
        sumScore(current_0);
        current_0 = 0;
        currentToZero(0);
    } else {
        removeActive(1);
        addActive(0);
        sumScore(current_1);
        current_1 = 0;
        currentToZero(1);
    }
}

const hold = (numPlayer) => {
    removeActive(numPlayer);
    addActive(!numPlayer);
    sumScore(numPlayer ? current_1 : current_0,numPlayer);
    numPlayer ? current_1 = 0 : current_0 = 0;
    currentToZero(numPlayer ? current_1 : current_0);
    activePlayer = numPlayer ? 0 : 1;
    console.log('active player',activePlayer)
}

function rollDice(numberPlayer) {
    const randomNum = getRandomNum();
    showDice(randomNum);
    if (randomNum !== 1) {
        sumCurrent(randomNum, numberPlayer);
    } else {
        currentToZero(numberPlayer);
        removeActive(numberPlayer);
        addActive(!numberPlayer ? 1 : 0);
        activePlayer = numberPlayer ? 0 : 1;
    }

}

$btnRoll.addEventListener('click', () => {
    rollDice(activePlayer);
})
$btnHold.addEventListener('click', () => {
    hold(activePlayer);
});