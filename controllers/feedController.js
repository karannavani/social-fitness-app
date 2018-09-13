const Feed = require('../models/feed');

function feedCreate( req, res, next ){
  Feed
    .create(req.body)
    .then(feedItem => res.status(201).json(feedItem)) //201 is created
    .catch(next);
}

function feedIndex( req, res, next ){
  Feed
    .find()
    .populate('user challengeId exercisePlanId exercisePlanAdoptedFromId followUserId ')
    .sort({ createdAt: -1 })
    .then(feed => res.json(feed))
    .catch(next);
}

function feedPaginate( req, res, next ){
  Feed
    .paginate({}, req.body )
    .then(exercisePlans => res.json(exercisePlans))
    .catch(next);
}

function feedShow( req, res, next ){
  Feed
    .findById(req.params.id)
    .then(feedItem => res.json(feedItem))
    .catch(next);
}

module.exports = {
  create: feedCreate,
  index: feedIndex,
  show: feedShow,
  paginate: feedPaginate
};
