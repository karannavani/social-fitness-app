const express = require('express');
const Router = express.Router();

const exerciseController = require('../controllers/exerciseController');

Router.route('/exercises')
  .get(exerciseController.index);

module.exports = Router;
