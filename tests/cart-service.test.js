const { retrieveCart, addToCart, removeCart } = require('../dao/cart-dao');
const { showCart, placeInCart, removeUserCart } = require('../service/cart-service');

jest.mock('../dao/cart-dao', () => {
    return {
        retrieveCart: jest.fn(),
        addToCart: jest.fn(),
        removeCart: jest.fn()
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
        expect(cart).toStrictEqual({
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
        });
    });

    test('An empty cart should return an empty cart', async () => {
        retrieveCart.mockReturnValueOnce(Promise.resolve({Items: []}));

        const emptyCart = await showCart('testuser');
        expect(emptyCart).toStrictEqual({Items: []});
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

    test('The function to remove a users cart should remove the users cart from the table', async () => {
        removeCart.mockReturnValueOnce(Promise.resolve(
            {
                Item: {
                  products: [ 
                    {
                        "name": "Lenovo Ideapad",
                        "description": "Windows 11",
                        "price": 450,
                        "product_id": "7757a3df-6e2b-4c9a-b9a7-2936aff305bc",
                        "imageURL": "6137YYIY24L._AC_SX679_.jpg"
                    },
                    {
                        "name": "Lenovo Ideapad",
                        "description": "Windows 11",
                        "price": 450,
                        "product_id": "7757a3df-6e2b-4c9a-b9a7-2936aff305bc",
                        "imageURL": "6137YYIY24L._AC_SX679_.jpg"
                    }
                ],
                  username: 'testuser'
                },

                Item: {
                    products: [ 
                      {
                          "name": "Lenovo Ideapad",
                          "description": "Windows 11",
                          "price": 450,
                          "product_id": "7757a3df-6e2b-4c9a-b9a7-2936aff305bc",
                          "imageURL": "6137YYIY24L._AC_SX679_.jpg"
                      },
                      {
                          "name": "Lenovo Ideapad",
                          "description": "Windows 11",
                          "price": 450,
                          "product_id": "7757a3df-6e2b-4c9a-b9a7-2936aff305bc",
                          "imageURL": "6137YYIY24L._AC_SX679_.jpg"
                      }
                  ],
                    username: 'saveme'
                  }
            }
        ));

        const res = await removeUserCart('testuser');
        expect(res).toStrictEqual({Item: {
            products: [ 
              {
                  "name": "Lenovo Ideapad",
                  "description": "Windows 11",
                  "price": 450,
                  "product_id": "7757a3df-6e2b-4c9a-b9a7-2936aff305bc",
                  "imageURL": "6137YYIY24L._AC_SX679_.jpg"
              },
              {
                  "name": "Lenovo Ideapad",
                  "description": "Windows 11",
                  "price": 450,
                  "product_id": "7757a3df-6e2b-4c9a-b9a7-2936aff305bc",
                  "imageURL": "6137YYIY24L._AC_SX679_.jpg"
              }
          ],
            username: 'saveme'
          }});
    })

})