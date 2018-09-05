const User = require('../models/user');


function userShow( req, res, next ){
// GET to /users/:id
  User
    .findById(req.params.id)
    .populate('followers following exercisePrograms')
    .then(user => res.json(user))
    .catch(next);

  // get all user data for one user, used for profile and dashboard
  // populates the followers, following and exercisePrograms arrays
  // returns an object to the client with all the users data
}

function userUpdate( req, res, next ){
// PUT to /users/:id/edit
  User
    .findById(req.params.id)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.status(201).json(user)) //201 is created
    .catch(next);

  //update a user profile
  // send the updated user object back to the client
  // NOTE:  we may need to populate the three arrays again here.
  // EG: .then(event => Event.populate(event, { path: 'guests'}))
}

function userFollow( req, res, next ){
  // PUT to /users/:id/follow   with body of user to follow;

  //add the other user to the users following array
  //add the user to another another users followers array
}

function userFollowIndex( req, res, next ){
  // GET /users/:id/follow

  // get the user model populate it its follower and following arrays
}

function addUserGrit( req, res, next ){
  // PUT /users/:id/grit
}

module.exports = {
  //dashboard
  //profile show
  show: userShow,
  update: userUpdate,
  //follow
  follow: userFollow,
  //followingIndex
  //followerIndex
  followIndex: userFollowIndex,   // NOTE: this could be the same as GET users
  //update daily GRIT
  createGrit: addUserGrit
};
