const { userModel } = require('../models/user');

const getCurrentUser = (req, res, next) => {
  const currentUserId = req.user;
  userModel
    .findById(currentUserId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  getCurrentUser,
};
