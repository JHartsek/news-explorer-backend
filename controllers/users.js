const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { userModel } = require('../models/user');

const getCurrentUser = (req, res, next) => {
  const currentUserId = req.user;
  userModel
    .findById(currentUserId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  userModel
    .findOne({ email })
    .select('passord')
    .then((account) => {
      if (account) {
        return Promise.reject(new Error('This email has already been taken!'));
      }
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          userModel.create({ name, email, password: hash });
        })
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.send(err);
        });
    })
    .catch((err) => {
      res.send(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  let user;
  userModel
    .findOne({ email })
    .select('password')
    .then((account) => {
      if (!account) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      user = account;
      return bcrypt.compare(password, user.password);
    })
    .then((authenticated) => {
      if (!authenticated) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'encoding-string',
        { expiresIn: '7d' },
      );
      res.send({ user, token });
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
};
