module.exports = class UsernameExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = "UsernameExistsError";
    }
}