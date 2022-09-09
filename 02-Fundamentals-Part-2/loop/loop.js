console.log('hello from loop.js');
const array = [true, 33, 'some', {name: 'bob'}, [3, 4, 5], null, undefined, 32n];
const typeValues = [];
for (const arrayElement of array) {
    typeValues.push(typeof arrayElement);
    if (typeof arrayElement !== "string") continue;
    console.log(arrayElement);
}
//second variant
const types = [];
array.forEach(x => {
    types.push(typeof x);
})
console.log(typeValues);
console.log(types);

const years = [1999, 1955, 2003, 2008];
const ages = [];
years.forEach(x => ages.push(new Date().getFullYear() - x));
console.log(ages);
console.log('******************')
array.reverse().forEach(x => console.log(x));

let dice = Math.trunc(Math.random() * 6 + 1);
while (dice != 6) {
    console.log(`you rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6 + 1);
    dice === 6 && console.log('loop is about to end...');
}
;
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

function calcTip(arr) {
    arr.forEach((x, i) => {
        if (x >= 50 && x <= 300) {
            tips.push(x * .15);
            totals.push(tips[i] + x);
        } else {
            tips.push(x * .2);
            totals.push(tips[i] + x);
        }
    });
    return {
        tips,
        totals,
    }
};
console.log(calcTip(bills));
const calcAverage = (arr) => {
    let sum = 0;
    for (const el of arr) {
        sum += el;
    }
    console.log(sum / arr.length);
    return arr.reduce((a, c) => a + c) / arr.length;
}
console.log(calcAverage(totals));
for (const el of totals) {
    var a=0;
a++;
}
console.log(a);
let b=0;
while (b<5){
     var c=1;
    c+=1;
    b++;
}
console.log(c);