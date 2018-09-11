// BACK END ROUTER
//testing again

const express = require('express');
const Router = express.Router();


// CONTROLLERS
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const exercisePlanController = require('../controllers/exercisePlanController');
const tribeController = require('../controllers/tribeController');
const challengeController = require('../controllers/challengeController');
const feedController = require('../controllers/feedController');

//-------- AUTH ROUTES
Router.route('/login')
  .post(authController.login);
//
Router.route('/register')
  .post(authController.register);

//------- USER ROUTES
Router.route('/users')
  .get(userController.index);

Router.route('/users/:id')
  .get(userController.show)
  .put(userController.update)
  // .patch(userController.patch)
  .delete(userController.delete);

Router.route('/users/:userId/follow')
  .post(userController.createFollow)
  .put(userController.deleteFollow);

Router.route('/users/:id/grit')
  .post(userController.createGrit);

Router.route('/users/:id/exerciseplan')
  .post(userController.updateExercisePlan);


//------- EXERCISE ROUTES
Router.route('/exerciseplans')
  .get(exercisePlanController.index)
  .post(exercisePlanController.create); // NOTE: also takes care of adopt

Router.route('/exerciseplans/paginate')
  .post(exercisePlanController.paginate);

Router.route('/exerciseplans/:id')
  .get(exercisePlanController.show)
  .put(exercisePlanController.update)
  .patch(exercisePlanController.updateDay)
  .delete(exercisePlanController.delete);

//------- TRIBE ROUTES
Router.route('/tribes/:tribeName')
  .get(tribeController.index);

Router.route('/tribes')
  .get(tribeController.index);

//------- FEED ROUTES
Router.route('/feed')
  .post(feedController.create)
  .get(feedController.index);

Router.route('/feed/paginate')
  .post(feedController.paginate);
  
Router.route('/feed/:id')
  .get(feedController.show);

//-------- CHALLENGES ROUTES
Router.route('/challenges')
  .get(challengeController.index);

Router.route('/challenges/:id')
  .get(challengeController.show)
  .post(challengeController.update);


module.exports = Router;
