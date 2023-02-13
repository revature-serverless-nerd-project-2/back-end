module.exports = class InvalidUsernameError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidUsernameError';
  }
};
