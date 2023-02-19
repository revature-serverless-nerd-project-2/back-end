const { register } = require('../service/registration-service');
const { getUserByUsername } = require('../DAO/users-dao');
const { addUser } = require('../DAO/registration-dao');
const LengthValidationError = require('../errors/length-validation-error');
const UsernameExistsError = require('../errors/username-exists-error');
const NoInputError = require('../errors/no-input-error');
const PasswordMatchingError = require('../errors/password-matching-error');
const { rejects } = require('assert');
jest.mock('../DAO/registration-dao', function() {
    return {
        addUser: jest.fn()
    }
});
jest.mock('../DAO/users-dao', function() {
    return{
        getUserByUsername: jest.fn()
    }
});

describe('Registration Tests', () => {
    test('Username provided is at least 5 characters', async() => {
        await expect(register('noway', 'password', 'password', 'test', 'revature way')).rejects.toThrow(LengthValidationError);
    });

    test('Password Provided is at least 5 characters', async() => {
        await expect(register('testuser', 'pass', 'pass', 'test', 'revature way')).rejects.toThrow(LengthValidationError);
    });

    test('Username already exists', async() => {
        getUserByUsername.mockReturnValueOnce(
            Promise.resolve({
                Item: {
                    username: "testuser",
                    password: "password",
                    name: "name",
                    address: "revature way"
                },
            })
        );

        await expect(register('testuser', 'password', 'password', 'test', 'revature way')).rejects.toThrow(UsernameExistsError);
    });

    test('Name field is empty', async() => {
        getUserByUsername.mockReturnValueOnce(Promise.resolve({}));

        await expect(register('testuser', 'password', 'password', '', 'revature way')).rejects.toThrow(NoInputError);
    });

    test('Address field is empty', async() => {
        getUserByUsername.mockReturnValueOnce(Promise.resolve({}));

        await expect(register('testuser', 'password', 'password', 'name', '')).rejects.toThrow(NoInputError);
    });

    test('Passwords do not match', async() => {
        getUserByUsername.mockReturnValueOnce(Promise.resolve({}));

        await expect(register('testuser', 'password', 'password1', 'name', 'revature way')).rejects.toThrow(PasswordMatchingError);
    });

    test('Successful Registration', async() => {
        getUserByUsername.mockReturnValueOnce(Promise.resolve({}));

        await expect(register('testuser', 'password', 'password', 'name', 'revature way'));
    });
});