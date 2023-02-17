module.exports = class InvalidProductInfoError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidProductInfoError';
  }
};
