module.exports = class NoProductsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoProductsError';
  }
};
