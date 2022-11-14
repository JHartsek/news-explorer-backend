class ResourceNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'ResourceNotFoundError';
  }
}

module.exports = {
  ResourceNotFoundError,
};
