//exporting module
console.log('exporting module');
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