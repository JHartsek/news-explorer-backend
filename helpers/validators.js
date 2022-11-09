const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('./validateURL');

const validateCreateUser = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  });
  next();
};

const validateLogin = (req, res, next) => {
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  });
  next();
};

const validateSaveArticle = (req, res, next) => {
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
  });
  next();
};

const validateDeleteArticle = (req, res, next) => {
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().alphanum().length(24),
    }),
  });
  next();
};

module.exports = {
  validateCreateUser,
  validateLogin,
  validateSaveArticle,
  validateDeleteArticle,
};
