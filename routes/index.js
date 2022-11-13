const express = require('express');

const router = express.Router();
const { validateCreateUser, validateLogin } = require('../helpers/validators');
const { createUser, login } = require('../controllers/users');
const { auth } = require('../middleware/auth');
const userRouter = require('./users');
const articleRouter = require('./articles');
const { ResourceNotFoundError } = require('../errors/ResourceNotFoundError');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);

router.use('/users', auth, userRouter);
router.use('/articles', auth, articleRouter);

router.use('/', (req, res) => {
  throw new ResourceNotFoundError('Path not found');
});

module.exports = {
  router,
};
