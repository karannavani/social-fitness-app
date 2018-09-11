const Challenge = require('../models/challenge');

function challengesIndex( req, res, next) {
  Challenge
    .find()
    .then(challenges => res.json(challenges))
    .catch(next);
}



module.exports = {
  index: challengesIndex
};
