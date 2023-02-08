const { getUserByUsername } = require('../dao/users-dao');
const InvalidUsernameError = require('../errors/invalid-username-error');
const InvalidPasswordError = require('../errors/invalid-password-error');
const NoInputError = require('../errors/no-input-error');

async function login(username, password) {
  if (!username || !password) {
    throw new NoInputError('Please provide both username and password');
  }
  const data = await getUserByUsername(username);
  const user = data.Item;
  if (!user) {
    throw new InvalidUsernameError(`No user with username ${username} exists`);
  }
  if (password !== user.password) {
    throw new InvalidPasswordError('Password and username do not match');
  }

  return user;
}

module.exports = {
  login,
};
