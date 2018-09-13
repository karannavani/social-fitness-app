// BACK END ROUTER
const express = require('express');
const Router = express.Router();

// CONTROLLERS
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const exercisePlanController = require('../controllers/exercisePlanController');
const tribeController = require('../controllers/tribeController');
const challengeController = require('../controllers/challengeController');
const feedController = require('../controllers/feedController');

const secureRoute = require('../lib/secureRoute');

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
  .all(secureRoute)
  .get(userController.show)
  .put(userController.update)
  // .patch(userController.patch)
  .delete(userController.delete);

Router.route('/users/:userId/follow')
  .all(secureRoute)
  .post(userController.createFollow)
  .put(userController.deleteFollow);

Router.route('/users/:id/grit')
  .all(secureRoute)
  .post(userController.createGrit);

Router.route('/users/:id/exerciseplan')
  .all(secureRoute)
  .post(userController.updateExercisePlan);


//------- EXERCISE ROUTES
Router.route('/exerciseplans')
  .all(secureRoute)
  .get(exercisePlanController.index)
  .post(exercisePlanController.create); // NOTE: also takes care of adopt

Router.route('/exerciseplans/paginate')
  .post(secureRoute, exercisePlanController.paginate);

Router.route('/exerciseplans/:id')
  .all(secureRoute)
  .get(exercisePlanController.show)
  .put(exercisePlanController.update)
  .patch(exercisePlanController.updateDay)
  .delete(exercisePlanController.delete);

Router.route('/exerciseplans/:userId/active')
  .get(secureRoute, exercisePlanController.active);

Router.route('/exerciseplans/:userId/future')
  .get(secureRoute, exercisePlanController.future);

//------- TRIBE ROUTES
Router.route('/tribes/:tribeName')
  .get(tribeController.index);

Router.route('/tribes')
  .get(tribeController.index);

//------- FEED ROUTES
Router.route('/feed')
  .all(secureRoute)
  .post(feedController.create)
  .get(feedController.index);

Router.route('/feed/paginate')
  .all(secureRoute)
  .post(feedController.paginate);

Router.route('/feed/:id')
  .get(secureRoute, feedController.show);

//-------- CHALLENGES ROUTES
Router.route('/challenges')
  .get(challengeController.index);

Router.route('/challenges/:id')
  // .all(secureRoute)
  .get(challengeController.show)
  .post(challengeController.update);

Router.route('/challenges/:id/delete')
  .post(secureRoute, challengeController.delete);

Router.route('/challenges/:id/completed')
  .post(secureRoute, challengeController.complete);


module.exports = Router;
