const jwt = require('jsonwebtoken');
const Promise = require('bluebird');

function createJWT(username, role){
    return jwt.sign({
        username,
        role
    }, 'thisisasecret', { expiresIn : "1d"})


}

jwt.verify = Promise.promisify(jwt.verify)

function verifyTokenAndReturnPayload(token){
    return jwt.verify(token, 'thisisasecret')
}

module.exports = {
    createJWT,
    verifyTokenAndReturnPayload
}