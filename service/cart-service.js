const { retrieveCart, addToCart } = require('../dao/cart-dao');

async function showCart(username){
    const data = await retrieveCart(username);
    const cart = data.Items;

    return cart;
}

async function placeInCart(product_id, username){
    const item = await addToCart(product_id, username);
    return item;
}

module.exports = {
    showCart,
    placeInCart
}