const { retrieveCart, addToCart, removeCart } = require('../dao/cart-dao');

async function showCart(username){
    const data = await retrieveCart(username);
    return data;
}

async function placeInCart(product_id, description, imageURL, name, price, username){
    const item = await addToCart(product_id, description, imageURL, name, price, username);
    return item;
}

async function removeUserCart(username){
    const data = await removeCart(username);
    return data;
}
module.exports = {
    showCart,
    placeInCart,
    removeUserCart
}