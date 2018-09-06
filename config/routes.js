// BACK END ROUTER
//testing again

const express = require('express');
const Router = express.Router();


// CONTROLLERS
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const exerciseController = require('../controllers/exerciseController');


// // AUTH ROUTES
Router.route('/login')
  .post(authController.login);
//
Router.route('/register')
  .post(authController.register);
//
// USER ROUTES
Router.route('/users')
  .get(userController.index);

Router.route('/users/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);

Router.route('/users/:userId/follow')
  .post(userController.createFollow)
  .put(userController.deleteFollow); // NOTE: will follow have its own ID?

Router.route('/users/:id/grit')
  .post(userController.createGrit);

// EXERCISE ROUTES
Router.route('/exercises')
  .get(exerciseController.index)
  .post(exerciseController.create); // NOTE: also take care of adopt

Router.route('/exercises/:id')
  .get(exerciseController.show)
  .put(exerciseController.update)
  .patch(exerciseController.updateDay)
  .delete(exerciseController.delete);


// Router.route('/exercise/:id/adopt');






module.exports = Router;
