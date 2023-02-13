const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

function createJWT(username, role) {
  return jwt.sign(
    {
      username,
      role,
    },
    'THisiSaSecrEtKey',
    {
      expiresIn: '1d',
    }
  );
}

function verifyTokenAndPayload(token) {
  jwt.verify = Promise.promisify(jwt.verify);
  return jwt.verify(token, 'secretkey');
}

module.exports = {
  createJWT,
  verifyTokenAndPayload,
};
