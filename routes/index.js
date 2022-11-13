const express = require('express');

const router = express.Router();
const { auth } = require('../middleware/auth');
const userRouter = require('./users');
const articleRouter = require('./articles');
const { ResourceNotFoundError } = require('../errors/ResourceNotFoundError');

router.use('/users', auth, userRouter);
router.use('/articles', auth, articleRouter);

router.use('/', (req, res) => {
  throw new ResourceNotFoundError('Path not found');
});

module.exports = {
  router,
};
