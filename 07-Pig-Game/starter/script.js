'use strict';

const $player_0 = document.querySelector('.player--0');
const $player_1 = document.querySelector('.player--1');
const $dice = document.querySelector('.dice');
const $score_0 = document.querySelector('#score--0');
const $score_1 = document.querySelector('#score--1');
const $current_0 = document.querySelector('#current--0');
const $current_1 = document.querySelector('#current--1');
const arrPlayers = [$player_0.classList, $player_1.classList];
const arrScoreElem = [$score_0, $score_1];
let current_0 = 0;
let current_1 = 0;
let score = [0, 0]
const active = 'player--active';
const hidden = 'hidden';
const winner = 'player--winner';
const rollBtn = 'btn--roll';
const holdBtn = 'btn--hold';
const newGameBtn = 'btn--new';
let activePlayer = 0;

function getRandomNum() {
    return Math.trunc(Math.random() * 6 + 1);
}

const removeActive = (playerNum) => {
    switch (playerNum) {
        case 0:
            arrPlayers[0].remove(active);
            break;
        case 1:
            arrPlayers[1].remove(active);
            break;
        default:
            console.error(`not ${playerNum} - only 0 or 1`);
    }
}
const addActive = (playerNum) => {
    if (playerNum >= 0 && playerNum <= 1) {
        playerNum ? arrPlayers[1].add(active) :
            arrPlayers[0].add(active);
    } else console.error(`not ${playerNum} - only 0 or 1`);
}
const showDice = (num) => {
    $dice.src = `dice-${num}.png`;
    $dice.classList.remove(hidden);
}

function getNewGame(arr) {
    score = [0, 0];
    arr.forEach(x => {
        x.textContent = score[activePlayer];
    });
    arrPlayers[1].remove(winner);
    arrPlayers[0].remove(winner);
    arrPlayers[0].add(active);
    arrPlayers[1].remove(active);
    $dice.classList.add(hidden);

}

const currentToZero = () => {
    current_0 = 0;
    current_1 = 0;
    $current_1.textContent = current_0;
    $current_0.textContent = current_1;
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
        score[player] += num;
        $score_1.textContent = score[player];
    } else {
        score[player] += num;
        $score_0.textContent = score[player];
    }
}

const hold = (numPlayer) => {

    removeActive(numPlayer);
    addActive(!numPlayer);
    sumScore(numPlayer ? current_1 : current_0, numPlayer);
    currentToZero();
    activePlayer = numPlayer ? 0 : 1;
    if (score[numPlayer] >= 40) {
        numPlayer
            ? arrPlayers[1].add(winner)
            : arrPlayers[0].add(winner);
    }
}

function rollDice(numberPlayer) {
    const randomNum = getRandomNum();
    showDice(randomNum);
    if (randomNum !== 1) {
        sumCurrent(randomNum, numberPlayer);
    } else {
        currentToZero();
        removeActive(numberPlayer);
        addActive(!numberPlayer ? 1 : 0);
        activePlayer = numberPlayer ? 0 : 1;
    }

}

document.body.addEventListener('click', (ev) => {
    ev.target.classList.contains(rollBtn) && rollDice(activePlayer);
    ev.target.classList.contains(holdBtn) && hold(activePlayer);
    ev.target.classList.contains(newGameBtn) && getNewGame(arrScoreElem);

})