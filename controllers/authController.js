const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');

function register(req, res, next) {
  console.log('body is', req.body);
  User.create(req.body)
    .then(user => createAndSendToken(user, res, `Created a profile for ${user.email}`))
    .catch(next);
}

function login(req, res, next) {
  User.findOne({ email: req.body.email})
    .then(user => {
      if(!user.validatePassword(req.body.password) || !user) {
        return res.status(401).json({ message: 'Authorization Failed'});
      }
      createAndSendToken(user, res, `Welcome back ${user.username}`);
    })
    .catch(next);
}

function createAndSendToken(user, res, message) {
  const token = jwt.sign({ sub: user.id, username: user.username, userTribe: user.tribe }, secret, { expiresIn: '2hr' });
  res.json({ message, token });
}

module.exports = {
  login, register
};
