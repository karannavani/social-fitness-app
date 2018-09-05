const express = require('express');
const Router = express.Router();

const exerciseController = require('../controllers/exerciseController');
const authController = require('../controllers/authController');

Router.route('/login')
  .post(authController.login);

Router.route('/register')
  .post(authController.register);

Router.route('/exercises')
  .get(exerciseController.index);

module.exports = Router;
