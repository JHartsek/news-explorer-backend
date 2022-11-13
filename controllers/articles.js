const { articleModel } = require('../models/article');
const { ForbiddenActionError } = require('../errors/ForbiddenActionError');
const { ResourceNotFoundError } = require('../errors/ResourceNotFoundError');
const { BadRequestError } = require('../errors/BadRequestError');

const getSavedArticles = (req, res, next) => {
  articleModel
    .find({})
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
  const owner = '637024abdf8cf20c35a80792';

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
        ? next(new BadRequestError('Invalid data submitted'))
        : next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const user = '637024abdf8cf20c35a80792';
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
            res.send({ message: 'Article removed!' });
          });
        return;
      }
      throw new ForbiddenActionError("Can't delete another user's articles");
    })
    .catch((err) => {
      err.name === 'DocumentNotFoundError'
        ? next(new ResourceNotFoundError('Could not find requested article'))
        : next(err);
    });
};

module.exports = {
  getSavedArticles,
  saveArticle,
  deleteArticle,
};
