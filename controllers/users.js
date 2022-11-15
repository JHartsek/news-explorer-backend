const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { ConflictError } = require('../errors/ConflictError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { ResourceNotFoundError } = require('../errors/ResourceNotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const {
  badRequestErrorMsg, conflictErrorMsg, userNotFoundMsg, incorrectCredentialsMsg,
} = require('../utils/constants');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const { userModel } = require('../models/user');

const getCurrentUser = (req, res, next) => {
  const currentUserId = req.user._id;
  userModel
    .findById(currentUserId)
    .orFail()
    .then((user) => {
      res.send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      err.name === 'DocumentNotFoundError'
        ? next(new ResourceNotFoundError(userNotFoundMsg))
        : next(err);
    });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  userModel
    .findOne({ email })
    .select('+password')
    .then((account) => {
      if (account) {
        return Promise.reject(
          new ConflictError(conflictErrorMsg),
        );
      }
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          userModel.create({ name, email, password: hash }).then((user) => {
            res.send({ name, email });
          });
        })
        .catch((err) => {
          err.name === 'ValidationError'
            ? next(new BadRequestError(badRequestErrorMsg))
            : next(err);
        });
    })
    .catch((err) => {
      err.name === 'ValidationError'
        ? next(new BadRequestError(badRequestErrorMsg))
        : next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let user;
  userModel
    .findOne({ email })
    .select('+password')
    .then((account) => {
      if (!account) {
        return Promise.reject(
          new UnauthorizedError(incorrectCredentialsMsg),
        );
      }
      user = account;
      return bcrypt.compare(password, user.password);
    })
    .then((authenticated) => {
      if (!authenticated) {
        return Promise.reject(
          new UnauthorizedError(incorrectCredentialsMsg),
        );
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'encoding-string',
        { expiresIn: '7d' },
      );
      res.send({ email: user.email, token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
};
