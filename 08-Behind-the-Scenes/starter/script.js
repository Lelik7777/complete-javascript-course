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

console.log(countProducts === window.countProducts);//true
console.log(fun1 === window.fun1);//true
window.fun1();// и ф-ция отработает


//this

const jonas = {
    name: 'Jonas',
    yearBorn: 1991,
    getAge() {
        console.log(this);//{name: 'Jonas', yearBorn: 1991, getAge: ƒ}
        const arrowFun = () => {
            console.log(this);//{name: 'Jonas', yearBorn: 1991, getAge: ƒ}
        }
        arrowFun();
        return new Date().getFullYear() - this.yearBorn;
    },
    someMethod: () => {
        console.log(this);//window
    }
}
jonas.someMethod();
jonas.getAge();//{name: 'Jonas', yearBorn: 1991, getAge: ƒ}
const ageJonas = jonas.getAge;
//throw error in strict mode or NaN in sloppy mode
//console.log(ageJonas());//TypeError: Cannot read properties of undefined (reading 'yearBorn')

//на что указывает this
const ann = {
    name: 'Ann',
    yearBorn: 1984,
}
//method borrow
ann.getAge = jonas.getAge;
console.log(ann);
console.log(ann.getAge());
//the same only with using method call()
console.log('using .call()', jonas.getAge.call(ann));// 38
//the same using bind()
const ageAnn = jonas.getAge.bind(ann);
console.log(ageAnn());
console.log(ann);
const button = document.createElement('button');
button.innerHTML = 'button';
document.body.append(button);

function listen() {
    console.log(this);
}

// 110 and 112 одинаковы по смыслу
console.log(this)
button.addEventListener('click', () => {
    console.log(this)//window - поскольку у стрелочной ф-ции нет собственного this, поэтому this указывает на window
})
button.addEventListener('click', function () {

    console.log(this);// <button>button</button>
});
button.addEventListener('click', listen)//<button>button</button>

function someFun() {
    console.log(this);
}

someFun()//undefined
const arrow = () => {
    console.log(this)
}
arrow();//window
const someFun2 = (arg) => {
    console.log(arg);
}

function parentFun() {
    console.log(this);//undefined
    someFun2(this);//undefined
}

parentFun()


// regular functions vs arrow functions
//there in object window create property firstName: Ann
//var firstName='Ann';
const bob = {
    firstName: 'Bob',
    year: 1990,
    calcAge: function () {
        console.log(new Date().getFullYear() - this.year);
    },
    greet: () => console.log(`hey,${this.firstName}`),
};
bob.greet();// hey,undefined or  you see hey,Ann если раскомментить 170
//если мы объявляем и вызываем ф-ию в методе и в ней используем this,то нужно использовать стрелочную ф-цию!!!
const tom = {
    name: 'tom',
    year: 2000,
    getAge() {
        console.log(new Date().getFullYear() - this.year);
        //const self=this; //и использовать эту переменную в ф-ции вместо this - это решение из ES5
        // function isUSSR() {
        //     console.log(this.year<1993);//get TypeError: cannot read properties of undefined
        //  }
        //     isUSSR();
        // это решение из ES6 - использование стрелочной ф-цииi
     const isUssrArr = () => {
         console.log(this.year<1993);
     }
        isUssrArr();
    }
}

tom.getAge();


// arguments keyword
function add(a,b) {
    console.log(arguments);
    return a+b;
}
add(4,5,6);//Arguments(3) [4, 5, 6, callee: (...), Symbol(Symbol.iterator): ƒ]

const addArrow = (a,b) => {
    //console.log(arguments);//Uncaught ReferenceError: arguments is not defined
   // at addArrow

    return a+b;
}

addArrow(3,4,5,6);