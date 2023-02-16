const { retrieveCart, addToCart } = require('../dao/cart-dao');
const { showCart, placeInCart } = require('../service/cart-service');

jest.mock('../dao/cart-dao', () => {
    return {
        retrieveCart: jest.fn(),
        addToCart: jest.fn()
    };
});

describe('Testing cart functions', () => {
    test('All items in a users cart should be returned', async () => {
        retrieveCart.mockReturnValueOnce(Promise.resolve({Items: ['product1', 'productid2', 'product3']}));

        const cart = await showCart('testuser');
        expect(cart).toStrictEqual(['product1', 'productid2', 'product3']);
    });

    test('An empty cart should return a message about an empty cart', async () => {
        retrieveCart.mockReturnValueOnce(Promise.resolve({Items: []}));

        const emptyCart = await showCart('testuser');
        expect(emptyCart).toStrictEqual('Empty Cart');
    })

    test('An item should be added to the cart when the addToCart function is called', async () => {
        addToCart.mockReturnValueOnce(Promise.resolve('product123'));

        const item = await placeInCart('product123', 'testuser');
        expect(item).toStrictEqual('product123');
    })

})