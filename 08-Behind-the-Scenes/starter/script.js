'use strict';
//block scope for function using strict mode
// {
//     function sum(a,b) {
//         return a+b;
//     }
// }
// //console.log(sum(4,5));//reference error
//
//
// const fun1 = (a,b) => {
//   const fun2 = () => {
//     return a+b;
//   }
//     console.log(fun2());
//   return fun2();
// }
// const a=fun1(4,5);
// console.log(a);
//
// const name='jonas';
// first();
// function first() {
//     const b='hello';
//     second();
//     function second() {
//         const c='hi';
//         third();
//     }
// }
// function third() {
//     const d='hey!';
//     console.log(name)
// }
//
let outerVar = 100;

function sumNum(a, b) {
    console.log(globalNum);
    if (a > b) {
        outerVar = 200;
        console.log(outerVar)
    }
    console.log(outerVar);
    return a + b;
}

//sumNum(3,4); //reference error
const globalNum = 5;
sumNum(6, 5);
console.log(outerVar);


//hoisting

//console.log(fun);//reference error if const and let,but var return undefined

const fun = () => {
    console.log(`it's fun function`);
}

console.log(fun1);//undefined
var fun1 = function () {
    console.log(`it's fun1 function`);
}

// someVariable находится сейчас in TDZ,поэтому будет выброшена reference error
//console.log(somVariable);

let someVariable=100;