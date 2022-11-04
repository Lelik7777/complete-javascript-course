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
//const res = await fetch('https://jsonplaceholder.typicode.com/posts');
//const data = await res.json();
//console.log(data);
//выполнение этой консоли будет дожидаться загрузки данных и только после этого он сработает!!!
console.log('something');

//using usual async function
const getLastPost = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json();
    //return last post
    return {title: data.at(-1).title, text: data.at(-1).body};
}
//using .then
getLastPost().then(res => res);

//теперь же используя возможности модуля и await легко можно получить рузультат,который возвращает асинхронная ф-ция
//const lastPost = await getLastPost();
//console.log(lastPost);

//module pattern
//здесь,использую IIFE, я создаю через замыкание область видимости,к которой имею доступ через public API - это то,что возращает IIFE
//до создания модулей этим паттерном пользовались для создания области с приватными данными, доступ к которым был черезе public API
const object = (function () {
    const cart = [];
    const addToCart = (product, quantity) => {
        cart.push({product, quality: quantity});
        console.log(`${quantity} ${product}  added to cart`);
    }

    const totalPrice = 230;
    const totalQuantity = 30;
    return {cart, addToCart, totalPrice}
})();
object.addToCart('bread', 3);
object.addToCart('milk', 1);
console.log(object);

// помимо module pattern  еще существуте CommonJs modules  - этот прием используется в node.js

//for export in node.js use export object
//export.addToCart = (product, quantity) => {
//         cart.push({product, quality: quantity});
//         console.log(`${quantity} ${product}  added to cart`);
//     }

//for import
//const{addToCart}=require('./shoppingCart.js');


//здесь импортирую,прописывая относительный путь к той ф-ции из lodash ,которая мне нужна
//import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
//поскольку мы используем parcel,то не нужно указывать полный относительный путь,так как parcel найдет lodash сам
import cloneDeep from 'lodash-es/cloneDeep.js';

const state = {
    cart: [
        {product: 'bread', quantity: 3},
        {product: 'milk', quantity: 2},
    ],
    user: {
        loggedIn: true,
    }
};
//copy object by Object.assign()
const copyState = Object.assign({}, state);
//это поменяет данный в state,а это означает,что копия поверхностная
copyState.user.loggedIn = false;
console.log(state);
//make deep clone by lodash cloneDeep
const deepCopyState = cloneDeep(state);
deepCopyState.user.loggedIn = true;
console.log('deep copy', deepCopyState);
console.log('state', state);

if (module.hot) {
    module.hot.accept();
}

