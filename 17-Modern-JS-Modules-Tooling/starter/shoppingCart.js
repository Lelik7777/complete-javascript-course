//exporting module

console.log('exporting module');
console.log('start getting users')
//blocking action - в импортируемом файле будет задержка,пока данные не загрузятся
const res=await fetch('https://jsonplaceholder.typicode.com/users');
const users=await res.json();
console.log(users);
console.log('finish getting users');
const shoppingCost = 10;
 let cart = [];
//Named export
export const addToCart = (product, quantity) => {
    cart.push({product, quality: quantity});
    console.log(`${quantity} ${product}  added to cart`);
}

//также через Named export можно одновременно экспортировать несколько переменных
const totalPrice = 230;
const totalQuantity = 30;
//также можем менять значение экспортируемой переменной
export {totalPrice, totalQuantity as tq,cart};

//default export
const removeFromCart = (product) => {
    cart = cart.filter(c => c.product !== product);
}

export default removeFromCart;
console.log(cart);