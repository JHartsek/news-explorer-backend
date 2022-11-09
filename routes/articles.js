const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../helpers/validateURL');

const articleRouter = express.Router();
const {
  getSavedArticles,
  saveArticle,
  deleteArticle,
} = require('../controllers/articles');

articleRouter.get('/', getSavedArticles);
articleRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(validateURL),
      image: Joi.string().required().custom(validateURL),
    }),
  }),
  saveArticle,
);

articleRouter.delete(
  '/:articleId',
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteArticle,
);

module.exports = articleRouter;
