'use strict';
//function return element by class or id name
//if true return element by class else by id
const getDomEl = (name, boolean = true) => {
    return boolean
        ? document.querySelector(`.${name}`)
        : document.getElementById(name);
}

// variables store DOM elements
const [player0, player1, dice0, score0, score1, current0, current1,] =
    ['player--0', 'player--1', 'dice', 'score--0', 'score--1', 'current--0', 'current--1'];
const $player_0 = getDomEl(player0);
const $player_1 = getDomEl(player1);
const $dice = getDomEl(dice0);
const $score_0 = getDomEl(score0, false);
const $score_1 = getDomEl(score1, false);
const $current_0 = getDomEl(current0, false);
const $current_1 = getDomEl(current1, false);
const arrPlayers = [$player_0.classList, $player_1.classList];

const arrScoreElem = [$score_0, $score_1];
const arrCurrentElem = [$current_0, $current_1];
const dice = $dice.classList;


//simple js variables
const [active, hidden, winner, rollBtn, holdBtn, newGameBtn, disabled] =
    ['player--active', 'hidden', 'player--winner', 'btn--roll', 'btn--hold', 'btn--new', 'disabled'];
//start conditions
let activePlayer = 0;
let currentScore = 0;
let playing = true;
let totalScore = [0, 0];

//functions

function getRandomNum() {
    return Math.trunc(Math.random() * 6) + 1;
}

const showDice = (num) => {
    $dice.src = `dice-${num}.png`;
    dice.remove(hidden);
}
//toggle between players
const toggleActive = () => {
    for (const el of arrPlayers) {
        el.toggle(active);
    }
}
//reset current score
const currentToZero = (numPlayer) => {
    currentScore = 0;
    arrCurrentElem[numPlayer].textContent = currentScore;

}

function sumCurrentScore(num, numPlayer) {
    currentScore += num;
    arrCurrentElem[numPlayer].textContent = currentScore;

}

function sumTotalScore(num, player) {
    totalScore[player] += num;
    arrScoreElem[player].textContent = totalScore[player];
}

function startNewGame(arr) {
    playing = true;
    totalScore = [0, 0];
    arr.forEach(x => {
        x.textContent = totalScore[activePlayer];
    });
    for (const el of arrPlayers) {
        if (el.contains(winner)) el.remove(winner);
        if (el.contains(winner) && el.contains(active)) el.remove(active);
    }
    arrPlayers[0].add(active);
    dice.add(hidden);
    // document.querySelector(`.${rollBtn}`).removeAttribute(disabled)
    // document.querySelector(`.${holdBtn}`).removeAttribute(disabled,'');
}

function rollDice(numberPlayer) {
    const randomNum = getRandomNum();
    showDice(randomNum);
    if (randomNum !== 1) {
        sumCurrentScore(randomNum, numberPlayer);
    } else {
        currentToZero(numberPlayer);
        toggleActive();
        activePlayer = numberPlayer ? 0 : 1;

    }

}

const hold = (numPlayer) => {
    toggleActive();
    sumTotalScore(currentScore, numPlayer);
    currentToZero(numPlayer);
    activePlayer = numPlayer ? 0 : 1;
    if (totalScore[numPlayer] >= 40) {
        playing = false;
        numPlayer
            ? arrPlayers[1].add(winner)
            : arrPlayers[0].add(winner);
// document.querySelector(`.${rollBtn}`).setAttribute(disabled,'');
// document.querySelector(`.${holdBtn}`).setAttribute(disabled,'');
    }
}


//listen events
document.body.addEventListener('click', (ev) => {
    const event = ev.target.classList;
    event.contains(rollBtn) && playing && rollDice(activePlayer);
    event.contains(holdBtn) && playing && hold(activePlayer);
    event.contains(newGameBtn) && startNewGame(arrScoreElem);

});