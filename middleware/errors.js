const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? 'An error has occured on the server' : message,
  });
};

module.exports = errorHandler;
