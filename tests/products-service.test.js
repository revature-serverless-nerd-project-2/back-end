const { showProducts, showProduct } = require('../service/product-service');
const { getAllProducts, getProductById } = require('../dao/products-dao');
const NoProductsError = require('../errors/no-products-error');
const InvalidProductError = require('../errors/invalid-product-error');

jest.mock('../dao/products-dao', function () {
  return {
    getAllProducts: jest.fn(),
    getProductById: jest.fn(),
  };
});

describe('Products view tests', () => {
  test('No products available', async () => {
    getAllProducts.mockReturnValueOnce(Promise.resolve({ Items: [], Count: 0, ScannedCount: 0 }));

    await expect(showProducts()).rejects.toThrow(NoProductsError);
  });

  test('All products are shown', async () => {
    getAllProducts.mockReturnValueOnce(
      Promise.resolve({
        Items: [
          {
            quantity: 4,
            imageUrl: 'someurl',
            description: 'somedesc',
            price: 25,
            name: 'product1',
            product_id: '12345',
          },
          {
            quantity: 7,
            imageUrl: 'someurl',
            description: 'somedesc',
            price: 12,
            name: 'product2',
            product_id: '12346',
          },
        ],
        Count: 2,
        ScannedCount: 2,
      })
    );

    const products = await showProducts();
    expect(products).toMatchObject([
      {
        quantity: 4,
        imageUrl: 'someurl',
        description: 'somedesc',
        price: 25,
        name: 'product1',
        product_id: '12345',
      },
      {
        quantity: 7,
        imageUrl: 'someurl',
        description: 'somedesc',
        price: 12,
        name: 'product2',
        product_id: '12346',
      },
    ]);
  });
});

describe('Singe product view', () => {
  test('Product does not exist', async () => {
    getProductById.mockReturnValueOnce(Promise.resolve({}));

    await expect(showProduct('123')).rejects.toThrow(InvalidProductError);
  });

  test('Product exists', async () => {
    getProductById.mockReturnValueOnce(
      Promise.resolve({
        Item: {
          quantity: 4,
          imageUrl: '61GELFs1J8L._AC_SX466_.jpg',
          description:
            'Microsoft Surface Laptop Go 12.4" Touchscreen Laptop PC, Intel Quad-Core i5-1035G1, 4GB RAM, 64GB eMMC, Webcam, Win 10 Pro, Bluetooth, Online Class Ready - Platinum',
          price: 260.95,
          name: 'Microsoft Surface Laptop Go 12.4"',
          product_id: '12345',
        },
      })
    );

    const product = await showProduct('12345');
    expect(product).toMatchObject({
      quantity: 4,
      imageUrl: '61GELFs1J8L._AC_SX466_.jpg',
      description:
        'Microsoft Surface Laptop Go 12.4" Touchscreen Laptop PC, Intel Quad-Core i5-1035G1, 4GB RAM, 64GB eMMC, Webcam, Win 10 Pro, Bluetooth, Online Class Ready - Platinum',
      price: 260.95,
      name: 'Microsoft Surface Laptop Go 12.4"',
      product_id: '12345',
    });
  });
});
