module.exports = class NoInputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoInputError';
  }
};
