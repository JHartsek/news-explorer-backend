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
      res.send(err);
    });
};

const saveArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  articleModel
    .create({
      keyword, title, text, date, source, link, image, owner,
    })
    .then((article) => {
      res.send(article);
    })
    .catch((err) => {
      err.name === 'DocumentNotFoundError' ? new ResourceNotFoundError('Could not find requested card') : res.send(err);
    });
};

const deleteArticle = (req, res, next) => {
  let selectedArticleOwner;
  articleModel
    .findById(req.params.articleId)
    .orFail()
    .then((article) => {
      selectedArticleOwner = article.owner.toString();
      if (req.user._id === selectedArticleOwner) {
        articleModel
          .findByIdAndRemove(req.params.articleId)
          .orFail()
          .then(() => {
            res.send({ message: 'Article removed!' });
          });
      }
      throw new ForbiddenActionError('Can\'t delete another user\'s articles');
    })
    .catch((err) => {
      err.name === 'DocumentNotFoundError' ? new ResourceNotFoundError('Could not find requested card') : res.send(err);
    });
};

module.exports = {
  getSavedArticles,
  saveArticle,
  deleteArticle,
};
