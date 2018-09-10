// BACK END ROUTER
//testing again

const express = require('express');
const Router = express.Router();


// CONTROLLERS
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const exercisePlanController = require('../controllers/exercisePlanController');
const tribeController = require('../controllers/tribeController');

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
Router.route('/exerciseplans')
  .get(exercisePlanController.index)
  .post(exercisePlanController.create); // NOTE: also take care of adopt

Router.route('/exerciseplans/paginate')
  .post(exercisePlanController.paginate);

Router.route('/exerciseplans/:id')
  .get(exercisePlanController.show)
  .put(exercisePlanController.update)
  .patch(exercisePlanController.updateDay)
  .delete(exercisePlanController.delete);

Router.route('/tribes/:tribeName')
  .get(tribeController.index);


// Router.route('/exercise/:id/adopt');






module.exports = Router;
