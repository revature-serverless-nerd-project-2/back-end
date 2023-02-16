module.exports = class LengthValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "LengthValidationError";
    }
}