const ExercisePlan = require('../models/exercisePlan');

function exercisePlanIndex(req, res, next) {
  ExercisePlan.find()
    // .populate('user')
    .then(exercisePlan => res.json(exercisePlan))
    .catch(next);
}

function exercisePlanShow(req, res, next) {
  ExercisePlan.findById(req.params.id)
    // .populate('user')
    .then(exercise => res.json(exercise))
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
  console.log('exercise controller fired');
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
  updateDay: exercisePlanPatch
};
