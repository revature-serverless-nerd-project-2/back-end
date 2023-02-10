const { retrieveCart } = require('../dao/cart-dao');
const { showCart } = require('../service/cart-service');

jest.mock('../dao/cart-dao', () => {
    return {retrieveCart: jest.fn()};
});

describe('Should retrieve a users cart', () => {
    test('All items in a users cart is displayed')
})