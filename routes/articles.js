const express = require('express');

const articleRouter = express.Router();
const {
  getSavedArticles,
  saveArticle,
  deleteArticle,
} = require('../controllers/articles');

articleRouter.get('/', getSavedArticles);
articleRouter.post('/', saveArticle);
articleRouter.delete('/:articleId', deleteArticle);

module.exports = articleRouter;
