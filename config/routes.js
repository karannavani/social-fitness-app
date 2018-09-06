// BACK END ROUTER

const express = require('express');
const Router = express.Router();


// CONTROLLERS
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const exerciseController = require('../controllers/exerciseController');


// AUTH ROUTES
Router.route('/login')
  .post(authController.login);

Router.route('/register')
  .post(authController.register);

// USER ROUTES
Router.route('/users')
  .get(userController.index);

Router.route('/users/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);

Router.route('/users/:id/follow')
  .post(userController.createFollow)
  .delete(userController.deleteFollow); //// IDEA: will follow have its own ID?

Router.route('/users/:id/grit')
  .post(userController.addUserGrit);

// EXERCISE ROUTES
Router.route('/exercises')
  .get(exerciseController.index);






module.exports = Router;
