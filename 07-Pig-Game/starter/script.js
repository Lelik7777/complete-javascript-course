'use strict';
// variables store DOM elements
const $player_0 = document.querySelector('.player--0');
const $player_1 = document.querySelector('.player--1');
const $dice = document.querySelector('.dice');
const $score_0 = document.querySelector('#score--0');
const $score_1 = document.querySelector('#score--1');
const $current_0 = document.querySelector('#current--0');
const $current_1 = document.querySelector('#current--1');
const arrPlayers = [$player_0.classList, $player_1.classList];
const arrScoreElem = [$score_0, $score_1];
const arrCurrentElem = [$current_0, $current_1];
const dice = $dice.classList;

//simple js variables
const [active, hidden, winner, rollBtn, holdBtn, newGameBtn] =
    ['player--active', 'hidden', 'player--winner', 'btn--roll', 'btn--hold', 'btn--new'];
let activePlayer = 0;
let current = [0, 0];
let score = [0, 0]

//functions

function getRandomNum() {
    return Math.trunc(Math.random() * 6 + 1);
}
//remove class $player
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
//add class $player
const addActive = (playerNum) => {
    if (playerNum >= 0 && playerNum <= 1) {
        playerNum ? arrPlayers[1].add(active) :
            arrPlayers[0].add(active);
    } else console.error(`not ${playerNum} - only 0 or 1`);
}

const showDice = (num) => {
    $dice.src = `dice-${num}.png`;
    dice.remove(hidden);
}

function startNewGame(arr) {
    score = [0, 0];
    arr.forEach(x => {
        x.textContent = score[activePlayer];
    });
    arrPlayers[1].remove(winner);
    arrPlayers[0].remove(winner);
    arrPlayers[0].add(active);
    arrPlayers[1].remove(active);
    dice.add(hidden);

}
//reset current score
const currentToZero = () => {
    current = [0, 0];
    arrCurrentElem[1].textContent = current[0];
    arrCurrentElem[0].textContent = current[1];
}

function sumCurrentScore(num, numPlayer) {
    if (numPlayer) {
        current[1] += num;
        arrCurrentElem[1].textContent = current[1];
    } else {
        current[0] += num;
        arrCurrentElem[0].textContent = current[0];
    }
}

function sumTotalScore(num, player) {
    if (player) {
        score[player] += num;
        arrScoreElem[1].textContent = score[player];
    } else {
        score[player] += num;
        arrScoreElem[0].textContent = score[player];
    }
}

const hold = (numPlayer) => {
    removeActive(numPlayer);
    addActive(!numPlayer);
    sumTotalScore(numPlayer ? current[1] : current[0], numPlayer);
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
        sumCurrentScore(randomNum, numberPlayer);
    } else {
        currentToZero();
        removeActive(numberPlayer);
        addActive(!numberPlayer ? 1 : 0);
        activePlayer = numberPlayer ? 0 : 1;
    }

}

//listen events
document.body.addEventListener('click', (ev) => {
    const event = ev.target.classList;
    event.contains(rollBtn) && rollDice(activePlayer);
    event.contains(holdBtn) && hold(activePlayer);
    event.contains(newGameBtn) && startNewGame(arrScoreElem);

});