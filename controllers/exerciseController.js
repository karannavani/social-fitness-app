const Exercise = require('../models/exercise');

function exercisesIndex(req, res, next) {
  Exercise.find()
    .populate('user')
    .then(exercises => res.json(exercises))
    .catch(next);
}

function exercisesShow(req, res, next) {
  Exercise.findById(req.params.id)
    .populate('user')
    .then(exercise => res.json(exercise))
    .catch(next);
}

function exercisesCreate(req, res, next) {
  Exercise.create(req.body)
    .then(exercise => res.json(exercise))
    .catch(next);
}

function exercisesUpdate(req, res, next) {
  Exercise.findById(req.params.id)
    .then(exercise => exercise.set(req.body))
    .then(exercise => exercise.save())
    .then(exercise => res.json(exercise))
    .catch(next);
}

function exercisesPatch(req, res, next) {
  Exercise.findById(req.params.id)
    .then(exercise => exercise.set(req.body))
    .then(exercise => exercise.save())
    .then(exercise => res.json(exercise))
    .catch(next);
}

function exercisesDelete(req, res, next) {
  console.log('exercise controller fired');
  Exercise.findById(req.params.id)
    .then(exercise => exercise.remove())
    .then(() => res.sendStatus(204)) // NO CONTENT
    .catch(next);
}

module.exports = {
  index: exercisesIndex,
  show: exercisesShow,
  create: exercisesCreate,
  update: exercisesUpdate,
  delete: exercisesDelete,
  updateDay: exercisesPatch
};
