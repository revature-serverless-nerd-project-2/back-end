const { getUserByUsername } = require('../dao/users-dao');
const InvalidUsernameError = require('../errors/invalid-username-error');
const InvalidPasswordError = require('../errors/invalid-password-error');
const NoInputError = require('../errors/no-input-error');
const bcrypt = require('bcrypt');

// function to validate user and pass it to the response
async function login(username, password) {
  // check if username or password is provided
  if (!username || !password) {
    throw new NoInputError('Please provide both username and password');
  }
  const data = await getUserByUsername(username);
  const user = data.Item;
  // check if user with username exists in the database
  if (!user) {
    throw new InvalidUsernameError(`No user with username ${username} exists`);
  }

  // if user exists check if provided password matches the password in the database
  if (!(await bcrypt.compare(password, user.password))) {
    throw new InvalidPasswordError('Password and username do not match');
  }

  return user;
}

module.exports = {
  login,
};
