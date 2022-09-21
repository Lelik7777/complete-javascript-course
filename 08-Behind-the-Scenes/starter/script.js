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

//console.log(fun1());// TypeError: fun1 is not a function -- мы здесь пытаемся вызвать undefined()
var fun1 = function () {
    console.log(`it's fun1 function`);
}
//fun2(); reference error: cannot access fun2 before initialization -- because fun2 in TDZ

let fun2 = function () {
    console.log('some text');
}
// someVariable находится сейчас in TDZ,поэтому будет выброшена reference error
//console.log(somVariable);

let someVariable = 100;

//example pitfall of var variable declaration
if (!countProducts) deleteProducts();

var countProducts = 10;

function deleteProducts() {
    console.log('all products delete');
}

console.log(countProducts===window.countProducts);//true
console.log(fun1===window.fun1);//true
window.fun1();// и ф-ция отработает


const jonas={
    name:'Jonas',
    yearBorn:1991,
    getAge(){
        console.log(this);
        return new Date().getFullYear()-this.yearBorn;
    }
}
jonas.getAge();//{name: 'Jonas', yearBorn: 1991, getAge: ƒ}
const ageJonas=jonas.getAge;
//throw error in strict mode or NaN in sloppy mode
//console.log(ageJonas());//TypeError: Cannot read properties of undefined (reading 'yearBorn')

const button=document.createElement('button');
button.innerHTML='button';
document.body.append(button);
function listen() {
    console.log(this);
}
// 110 and 112 одинаковы по смыслу
console.log(this)
button.addEventListener('click',()=>{
    console.log(this)//window - поскольку у стрелочной ф-ции нет собственного this, поэтому this указывает на window
})
button.addEventListener('click',function () {

    console.log(this);// <button>button</button>
});
button.addEventListener('click',listen)//<button>button</button>
