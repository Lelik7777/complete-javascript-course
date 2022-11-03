//exporting module
import {cart} from "./shoppingCart.js";


console.log('exporting module2');
const shoppingCost = 15;
const cart2 = [];
//Named export
export const addToCart = (product, quantity) => {
    cart2.push({product, quality: quantity});
    console.log(`${quantity} ${product}  added to cart`);
}
//также через Named export можно одновременно экспортировать несколько переменных
const totalPrice = 100;
const totalQuantity = 10;
const localPrice = 100;
//также можем менять значение экспортируемой переменной
export {totalPrice, totalQuantity};