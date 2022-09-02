console.log('%cternary operator', 'color:green;');
const valueBill = 275;
const valueTip = valueBill <= 300 && valueBill >= 50 ? console.log(`bill is ${valueBill} ,tip is ${15 * valueBill / 100} and by the end is ${valueBill + (15 * valueBill / 100)}`)
    : console.log(`bill is ${valueBill},tip is ${valueBill * .2} and by the end is ${valueBill * .2}`);

let tip;
if (valueBill >= 50 && valueBill <= 300) tip = valueBill * .15;
else tip = valueBill * .2;
console.log(tip);

function countBillWithTip(bill=275, max = 300, min = 50) {
    const tip = bill <= max && bill >= min ? bill * .15 : bill * .2;
    console.log(`bill is ${bill},tip is ${tip} and by the end is ${tip + bill}`);
    return {
        bill,
        tip,
        sumByEnd: tip + bill,
    }
}

countBillWithTip(275);
console.log(countBillWithTip(40));