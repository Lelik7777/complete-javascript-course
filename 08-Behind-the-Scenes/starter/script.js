'use strict';
//block scope for function using strict mode
{
    function sum(a,b) {
        return a+b;
    }
}
//console.log(sum(4,5));//reference error


const fun1 = (a,b) => {
  const fun2 = () => {
    return a+b;
  }
    console.log(fun2());
  return fun2();
}
const a=fun1(4,5);
console.log(a);

const name='jonas';
first();
function first() {
    const b='hello';
    second();
    function second() {
        const c='hi';
        third();
    }
}
function third() {
    const d='hey!';
    console.log(name)
}