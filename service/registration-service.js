const LengthValidationError = require('../errors/length-validation-error');
const UsernameExistsError = require('../errors/username-exists-error');
const PasswordMatchingError = require('../errors/password-matching-error');
const { addUser } = require('../DAO/registration-dao');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { getUserByUsername } = require('../DAO/users-dao');
const NoInputError = require('../errors/no-input-error');

async function register(username, password, confirmPassword, name, address) {
  if (username.length < 5 || password.length < 6) {
    throw new LengthValidationError('Username and Password must be at least 6 characters');
  }

  let data = await getUserByUsername(username);

  if (data.Item) {
    throw new UsernameExistsError('Username has already been taken');
  }

  if (name == '' || name == ' ') {
    throw new NoInputError('Name must not be left empty');
  }

  if (address == '' || address == ' ') {
    throw new NoInputError('Address must not be left empty');
  }

  if (password != confirmPassword) {
    throw new PasswordMatchingError('Passwords do not match');
  }
  const hashPassword = await bcrypt.hash(password, 10);

  await addUser(username, address, hashPassword, name);
}

module.exports = {
  register,
};
