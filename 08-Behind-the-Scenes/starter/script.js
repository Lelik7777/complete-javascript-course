'use strict';
//block scope for function using strict mode
{
    function sum(a,b) {
        return a+b;
    }
}
console.log(sum(4,5));//reference error