module.exports = class UserNotSignedIn extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserNotSignedIn';
    }
}