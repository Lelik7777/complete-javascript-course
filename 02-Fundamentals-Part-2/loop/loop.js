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