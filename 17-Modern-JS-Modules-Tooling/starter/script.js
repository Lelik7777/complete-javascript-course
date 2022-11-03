//importing module
//обычно используется что-то одно: либо named export or default export
//здесь я импортировал целиком весь файл
//также здесь происходит сначала выполнение того,что импортируется, а уже потом код текущего файла
//import by Named export
//мы можем изменять входящее имя импортируемой переменной
import {addToCart, totalPrice as price, tq, cart} from "./shoppingCart.js";

//import by default export
import remove from './shoppingCart.js';
//import all from module таким образом можно получить все,что экспортирует данный модуль - это похоже на создание объекта из класса
import * as shoppingCart2 from "./shoppingCart2.js";

addToCart('milk', 3);
addToCart('bread', 4);
remove('bread')
console.log('importing module');
console.log('total price =', price, 'and', 'total quantity =', tq);
console.log('cart', cart)
console.log(shoppingCart2.totalQuantity);
console.log(shoppingCart2.totalPrice);
console.log(shoppingCart2)
shoppingCart2.addToCart('bread', 4);

// using await in module without async function
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log(data)