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
        retrieveCart.mockReturnValueOnce(Promise.resolve({
            Items: [
                {
                    product_id: 'product1',
                    description: 'a dummy product',
                    imageURL: 'someimage.jpg',
                    name: 'productOne',
                    price: 250

                },
                {
                    prodcut_id: 'productid2',
                    description: 'a second dummy',
                    imageURL: 'anotherimage.jpg',
                    name: 'productTwo',
                    price: 315
                },
                {
                    prodcut_id: 'product3',
                    description: 'a third dummy',
                    imageURL: 'dummyURl.jpg',
                    name: 'productThree',
                    price: 10
                }
            ]
        }));

        const cart = await showCart('testuser');
        expect(cart).toStrictEqual([
            {
                product_id: 'product1',
                description: 'a dummy product',
                imageURL: 'someimage.jpg',
                name: 'productOne',
                price: 250

            },
            {
                prodcut_id: 'productid2',
                description: 'a second dummy',
                imageURL: 'anotherimage.jpg',
                name: 'productTwo',
                price: 315
            },
            {
                prodcut_id: 'product3',
                description: 'a third dummy',
                imageURL: 'dummyURl.jpg',
                name: 'productThree',
                price: 10
            }
        ]);
    });

    test('An empty cart should return a message about an empty cart', async () => {
        retrieveCart.mockReturnValueOnce(Promise.resolve({Items: []}));

        const emptyCart = await showCart('testuser');
        expect(emptyCart).toStrictEqual('Empty Cart');
    })

    test('An item should be added to the cart when the addToCart function is called', async () => {
        addToCart.mockReturnValueOnce(Promise.resolve(
            {
                prodcut_id: 'product123',
                description: 'a test product',
                imageURL: 'niceimage.jpg',
                name: 'goodProduct',
                price: 14
            }
        ));

        const item = await placeInCart('product123', 'a test product', 'niceimage.jpg', 'goodProduct', 14, 'testuser');
        expect(item).toStrictEqual({
            prodcut_id: 'product123',
            description: 'a test product',
            imageURL: 'niceimage.jpg',
            name: 'goodProduct',
            price: 14
        });
    })

})