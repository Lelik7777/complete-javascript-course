console.log('hello from array.js');
const array = new Array('hello', 'world', 777);
console.log(array.indexOf('hello'));
console.log(array.indexOf(555));
console.log(array.includes(777));
//.includes() применяется в условных конструкциях
if (array.includes(777)) console.log(`array has value ${array[array.length - 1]}`);
console.log(array.includes('some text'));
//я не могу переназначить данную переменную, но сам массив могу подвергать мутациям
//array=34;
console.log(array + 10);
console.log(array / 3);
console.log(array - 2);
console.log(String(array));// hello,world,777 as string
console.log(Number(array));//NaN

function sum(a, b) {
    return a + b;
}

//я могу создавать массив,помещая в него expressions for instance call of function
const values = [sum(4, 5), sum(4, 6), sum(5, 6)];
console.log(values);
[9, 10, 11];

//challenge
//decision by array as parameter in function
const calcTips = (bills) => {
    const tips = [];
    const total = [];
    for (let i = 0; i < bills.length; i++) {
        if (bills[i] >= 50 && bills[i] <= 300) {
            tips.push(bills[i] * .15);
            total.push(tips[i] + bills[i]);
        } else {
            tips.push(bills[i] * .2);
            total.push(tips[i] + bills[i])
        }
    }

    return {
        tips,
        total,
    }
}
console.log(calcTips([125, 555, 44]));

//decision by literal parameter in function
const calcTip = bill => bill >= 50 && bill <= 300 ? bill * .15 : bill * .2;
const bills = [125, 555, 44];
const totals = [];
for (const bill of bills) {
    totals.push(bill + calcTip(bill));
}
console.log(totals);
//console.log(bills+totals);
