const { articleModel } = require('../models/article');
const { ForbiddenActionError } = require('../errors/ForbiddenActionError');
const { ResourceNotFoundError } = require('../errors/ResourceNotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');
const {
  badRequestErrorMsg,
  forbiddenActionErrorMsg,
  articleNotFoundMsg,
} = require('../utils/constants');

const getSavedArticles = (req, res, next) => {
  articleModel
    .find({ owner: req.user._id })
    .then((articles) => {
      res.send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

const saveArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  articleModel
    .create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner,
    })
    .then((article) => {
      res.send(article);
    })
    .catch((err) => {
      err.name === 'ValidationError'
        ? next(new BadRequestError(badRequestErrorMsg))
        : next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const user = req.user._id;
  let selectedArticleOwner;
  articleModel
    .findById(req.params.articleId)
    .orFail()
    .then((article) => {
      selectedArticleOwner = article.owner.toString();
      if (user === selectedArticleOwner) {
        articleModel
          .findByIdAndRemove(req.params.articleId)
          .orFail()
          .then(() => {
            articleModel
              .find({ owner: req.user._id })
              .then((articles) => {
                res.send(articles);
              })
              .catch((err) => {
                next(err);
              });
          });
        return;
      }
      throw new ForbiddenActionError(forbiddenActionErrorMsg);
    })
    .catch((err) => {
      err.name === 'DocumentNotFoundError'
        ? next(new ResourceNotFoundError(articleNotFoundMsg))
        : next(err);
    });
};

module.exports = {
  getSavedArticles,
  saveArticle,
  deleteArticle,
};
