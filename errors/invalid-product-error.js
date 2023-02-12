module.exports = class InvalidProductError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidProductError';
  }
};
