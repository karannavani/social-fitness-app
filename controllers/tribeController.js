const User = require('../models/user');

function tribesIndex(req, res, next) {
  User
    .find()
    .then(users => {
      console.log('tribe name is',req.params.tribeName);
      return users.filter(user => user.tribe===req.params.tribeName);
    })
    .then(users => {
      res.json(users);
    })
    .catch(next);
}

module.exports = {
  index: tribesIndex
};
