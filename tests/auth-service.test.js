const { login } = require('../service/auth-service');
const { getUserByUsername } = require('../dao/users-dao');
const InvalidUsernameError = require('../errors/invalid-username-error');
const InvalidPasswordError = require('../errors/invalid-password-error');
const NoInputError = require('../errors/no-input-error');
const bcrypt = require('bcrypt');

jest.mock('../dao/users-dao', function () {
  return {
    getUserByUsername: jest.fn(),
  };
});

describe('Login tests', () => {
  test('No username provided', async () => {
    await expect(login('', 'password')).rejects.toThrow(NoInputError);
  });

  test('No password provided', async () => {
    await expect(login('username', '')).rejects.toThrow(NoInputError);
  });

  test('Username does not exist', async () => {
    getUserByUsername.mockReturnValueOnce(Promise.resolve({}));

    await expect(login('fakeuser', 'password')).rejects.toThrow(InvalidUsernameError);
  });

  test('Password and Username do not match', async () => {
    getUserByUsername.mockReturnValueOnce(
      Promise.resolve({
        Item: {
          password: '12345',
          username: 'customer1',
          address: '123 street',
          role: 'user',
          name: 'Joe Smith',
        },
      })
    );

    await expect(login('customer1', 'wrongPassword')).rejects.toThrow(InvalidPasswordError);
  });

  test('No errors, successful login', async () => {
    const hashedPassword = await bcrypt.hash('123456', 10);

    getUserByUsername.mockReturnValueOnce(
      Promise.resolve({
        Item: {
          password: hashedPassword,
          username: 'customer1',
          address: '123 street',
          role: 'user',
          name: 'Joe Smith',
        },
      })
    );

    const user = await login('customer1', '123456');
    expect(user).toMatchObject({
      password: hashedPassword,
      username: 'customer1',
      address: '123 street',
      role: 'user',
      name: 'Joe Smith',
    });
  });
});
