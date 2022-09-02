const scoreAverageDolphins = (96 + 108 + 89) / 3;
const scoreAverageKoalas = (88 + 91 + 110) / 3;
const winner = 'winner is ';

function isWinner(average1, average2) {
    if (average1 > average2) console.log(winner + 'Dolphins');
    else if (average1 === average2) console.log('it is draw');
    else console.log(winner + 'Koalas');
}
isWinner(scoreAverageDolphins,scoreAverageKoalas);

const arrayScoreDolphins = [97, 112, 101];
const arrayScoreKoalas = [109, 95, 123];

function averageWin(arr) {
    const array = [];
    for (let i = 0; i < arr.length; i++) {

        if (arr[i] >= 100) {
            array.push(arr[i]);
        }
    }
    let average;
    for (let i=0;i<array.length;i++){
        average+=array[i];
    }
    return average/array.length;
};
const scoreAverageDolphins1 = averageWin(arrayScoreDolphins);
const scoreAverageKoalas1 = averageWin(arrayScoreKoalas);
isWinner(scoreAverageDolphins1,scoreAverageKoalas1);

const arrayScoreDolphins2 = [97, 112, 101];
const arrayScoreKoalas2 = [109, 95, 106];

const scoreAverageDolphins2 = averageWin(arrayScoreDolphins2);
const scoreAverageKoalas2 = averageWin(arrayScoreKoalas2);
isWinner(scoreAverageDolphins2,scoreAverageKoalas2);
const number ='1';
switch (number) {
    case 0:
        console.log(0);
        break;
    case 1:
    case 2:
        console.log('1 and 2');// else if(number===1||number===2)
    default:
        console.log('invalid value')
}
const age=19;
console.log(`i like drink ${age>19?'wine 🍷':'water🥛'}`);