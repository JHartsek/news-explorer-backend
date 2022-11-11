const { articleModel } = require('../models/article');
const { ForbiddenActionError } = require('../errors/ForbiddenActionError');
const { ResourceNotFoundError } = require('../errors/ResourceNotFoundError');

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
  const owner = req.user || '636c1fa3d0cf0f7fa0a976e8';

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
      err.name === 'DocumentNotFoundError'
        ? next(new ResourceNotFoundError('Could not find requested article'))
        : next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const user = req.user || '636c1fa3d0cf0f7fa0a976e8';
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
