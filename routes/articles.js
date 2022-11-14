const express = require('express');
const { validateSaveArticle, validateDeleteArticle } = require('../helpers/validators');

const articleRouter = express.Router();
const {
  getSavedArticles,
  saveArticle,
  deleteArticle,
} = require('../controllers/articles');

articleRouter.get('/', getSavedArticles);
articleRouter.post(
  '/',
  validateSaveArticle,
  saveArticle,
);

articleRouter.delete(
  '/:articleId',
  validateDeleteArticle,
  deleteArticle,
);

module.exports = articleRouter;
