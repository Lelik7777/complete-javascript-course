// Remember, we're gonna use strict mode in all scripts now!
'use strict';
console.log('hello');
console.log('some text');
console.log('added text');
const temperatures = [-3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];
const temperatures2=[-19,-23,-1,'error',34,3,21,43];
console.log([...temperatures,...temperatures2]);
const findMaxValue = (arr) => {
    let max = arr[1];
    arr.forEach((x, i) => {
        if (x >= max) max = x;
    });
    return max;
}
const findMinValue = (arr) => {
    let min = arr[0];
    arr.forEach(x => {
        if (x <= min) min = x;
    });
    return min;
}
const checkArr = (arr) => {
    const copy = [...arr];
    arr.forEach(x => {
        if (typeof x === "number") copy.push(x);
    });
    return copy;
};
console.log('copy: ', checkArr(temperatures))
const amplitudeTemper = (arrTemper,...rest) => {
    console.log('rest',rest)
    let copy = [...arrTemper,...rest.flat(1)];
    console.log('copy from 33:',copy);
    copy.forEach((x, i) => {
        if (typeof x !== 'number') copy.splice(i, 1);
    });
    console.log('copy from 36',copy)
    //custom variant getting copy
    const copy2 = checkArr(copy);
    const maxValue = Math.max(...copy);
    const minValue = Math.min(...copy);
    //custom function for max and min value
    const maxValue1 = findMaxValue(copy2);
    const minValue2 = findMinValue(copy2);
    console.log(maxValue);
    console.log(minValue);
    console.log(copy)
    return {
        'amplitude from built-in functions': maxValue-minValue,
        'amplitude from custom functions': maxValue1 - minValue2,
    }
};
console.log('result is ', amplitudeTemper(temperatures,temperatures2,[4,5,5,50,64]));
function fun(arr,...rest) {
    return [...arr,...rest.flat(1)]
}

console.log(fun([3,4,5],[6,7,8],[9,10,11]));




