console.log('hello,function');

function f() {
    console.log('empty function');
    // return 'string';
}

let result = f();//undefined
if (result) console.log('function return something');
console.log(result);

const calcAverage = scores => scores.reduce((acc, cur) => acc + cur) / scores.length;
const scoreAverageDolphins = calcAverage([85, 54, 41]);
console.log(scoreAverageDolphins);
const scoreAverageKoalas = calcAverage([23, 34, 27]);
const checkWinner = (averageDolphis, averageKoalas) => {
    const noWin = 'nobody wins';
    if (averageDolphis >= averageKoalas) return averageDolphis >= averageKoalas * 2 ? 'dolphins wins' : noWin;
    if (averageDolphis < averageKoalas) return averageKoalas >= averageDolphis * 2 ? 'koalas wins' : noWin;
}
console.log(checkWinner(scoreAverageDolphins, scoreAverageKoalas))