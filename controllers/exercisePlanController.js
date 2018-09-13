const ExercisePlan = require('../models/exercisePlan');
const moment = require('moment');

function exercisePlanIndex(req, res, next) {
  ExercisePlan.find()
    .populate('user')
    .then(exercisePlan => res.json(exercisePlan))
    .catch(next);
}

function exercisePlanPaginate( req, res, next ){
  ExercisePlan
    .paginate({user: req.body.userId}, req.body)
    .then(exercisePlans => res.json(exercisePlans))
    .catch(next);
}

function exercisePlanShow(req, res, next) {
  ExercisePlan.findById(req.params.id)
    .populate({path: 'user exercisePlanAdoptedFrom', populate: {path: 'user'}})
    .then(exercise => res.json(exercise))
    .catch(next);
}

function exercisePlanActive( req, res, next ){
  ExercisePlan
    .find({user: req.params.userId})
    .then(usersPlans =>{
      return usersPlans.filter(usersPlan => usersPlan.activePlan);
    } )
    .then(activePlan => res.json(activePlan))
    .catch(next);
}

function exercisePlansFuture( req, res, next ){
  ExercisePlan
    .find({user: req.params.userId})
    .then(exercisePlans => {
      //return only the future plans
      return exercisePlans.filter(exercisePlan => exercisePlan.startDate >= moment().unix());
    })
    .then(futurePlans => res.json(futurePlans))
    .catch(next);
}

function exercisePlanCreate(req, res, next) {
  ExercisePlan.create(req.body)
    .then(exercise => res.json(exercise))
    .catch(next);
}

function exercisePlanUpdate(req, res, next) {
  ExercisePlan.findById(req.params.id)
    .then(exercise => exercise.set(req.body))
    .then(exercise => exercise.save())
    .then(exercise => res.json(exercise))
    .catch(next);
}

function exercisePlanPatch(req, res, next) {
  ExercisePlan.findById(req.params.id)
    .then(exercise => exercise.set(req.body))
    .then(exercise => exercise.save())
    .then(exercise => res.json(exercise))
    .catch(next);
}

function exercisePlanDelete(req, res, next) {
  ExercisePlan.findById(req.params.id)
    .then(exercise => exercise.remove())
    .then(() => res.sendStatus(204)) // NO CONTENT
    .catch(next);
}

module.exports = {
  index: exercisePlanIndex,
  show: exercisePlanShow,
  create: exercisePlanCreate,
  update: exercisePlanUpdate,
  delete: exercisePlanDelete,
  updateDay: exercisePlanPatch,
  paginate: exercisePlanPaginate,
  active: exercisePlanActive,
  future: exercisePlansFuture
};
