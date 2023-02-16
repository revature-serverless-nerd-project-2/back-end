module.exports = class NoOrdersError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NoProductsError';
    }
}