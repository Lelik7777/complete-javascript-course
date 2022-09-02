console.log('hello,function');

function f() {
    console.log('empty function');
   // return 'string';
}

let result=f();//undefined
if(result) console.log('function return something');
console.log(result);