const { retrieveCart } = require('../dao/cart-dao');
const { showCart } = require('../service/cart-service');

jest.mock('../dao/cart-dao', () => {
    return {retrieveCart: jest.fn()};
});

describe('Should retrieve a users cart', () => {
    test('All items in a users cart is displayed', async () => {
        retrieveCart.mockReturnValueOnce(Promise.resolve({Items: ['product1', 'productid2', 'product3']}));

        const cart = await showCart();
        expect(cart).toStrictEqual(['product1', 'productid2', 'product3']);
    });

})