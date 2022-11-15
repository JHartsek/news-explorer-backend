const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { authenticationFailedMsg } = require('../utils/constants');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(authenticationFailedMsg);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'encoding-string',
    );
  } catch (err) {
    throw new UnauthorizedError(authenticationFailedMsg);
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};
