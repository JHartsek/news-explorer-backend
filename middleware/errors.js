const { defaultErrorMsg } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? defaultErrorMsg : message,
  });
};

module.exports = errorHandler;
