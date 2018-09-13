const Challenge = require('../models/challenge');

function challengesIndex( req, res, next) {
  Challenge
    .find()
    .then(challenges => res.json(challenges))
    .catch(next);
}

function challengesShow(req, res, next) {
  Challenge
    .findById(req.params.id)
    .then(challenge => res.json(challenge))
    .catch(next);
}

function challengeUpdate(req, res, next) {
  Challenge
    .findById(req.params.id)
    .then(challenge => {
      challenge.challengers.push(req.body.id);
      return challenge.save();
    })
    .then(challenge => res.json(challenge))
    .catch(next);
}

function challengeDelete(req, res, next) {
  Challenge
    .findById(req.params.id)
    .then(challenge => {
      const index = challenge.challengers.indexOf(req.body.id);
      challenge.challengers.splice(index,index+1);
      return challenge.save();
    })
    .then(challenge => res.json(challenge))
    .catch(next);
}

function challengeComplete(req, res, next) {
  Challenge
    .findById(req.params.id)
    .then(challenge => {
      challenge.completedBy.push(req.body.id);
      return challenge.save();
    })
    .then(challenge => res.json(challenge))
    .catch(next);
}



module.exports = {
  index: challengesIndex,
  show: challengesShow,
  update: challengeUpdate,
  delete: challengeDelete,
  complete: challengeComplete
};
