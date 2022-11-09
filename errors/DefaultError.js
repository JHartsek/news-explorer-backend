class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = 'DefaultError';
  }
}

module.exports = {
  DefaultError,
};
