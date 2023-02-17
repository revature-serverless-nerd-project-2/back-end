module.exports = class EmptyAddressError extends Error {
    constructor(message) {
        super(message)
        this.name = "EmptyAddressError";
    }
}