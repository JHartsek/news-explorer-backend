const express = require('express');

const router = express.Router();
const userRouter = require('./users');
const articleRouter = require('./articles');
const { validateCreateUser, validateLogin } = require('../helpers/validators');
const { createUser, login } = require('../controllers/users');

router.use('/users', userRouter);
router.use('/articles', articleRouter);

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

module.exports = {
  router,
};
