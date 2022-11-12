const express = require('express');

const router = express.Router();
const { auth } = require('../middleware/auth');
const userRouter = require('./users');
const articleRouter = require('./articles');
const { validateCreateUser, validateLogin } = require('../helpers/validators');
const { createUser, login } = require('../controllers/users');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/articles', articleRouter);

module.exports = {
  router,
};
