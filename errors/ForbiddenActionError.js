class ForbiddenActionError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = 'ForbiddenActionError';
  }
}

module.exports = {
  ForbiddenActionError,
};
