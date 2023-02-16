module.exports = class NoCartItemsToCheckoutError extends Error {
    constructor(message) {
        super(message);
        this.name = "NoCartItemsToCheckoutError";
    }
}