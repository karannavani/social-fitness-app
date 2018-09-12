const User = require('../models/user');


// for dev purposes to get random ID in insomnia
function userIndex( req, res, next ){
  User
    .find()
    .then(users => res.json(users))
    .catch(next);
}

//---------- USER---------------//
function userShow( req, res, next ){
// GET to /users/:id
  User
    .findById(req.params.id)
    // .populate('followers following exercisePrograms')
    .then(user => res.json(user))
    .catch(next);

  // get all user data for one user, used for profile and dashboard
  // populates the followers, following and exercisePrograms arrays
  // returns an object to the client with all the users data
}

function userUpdate( req, res, next ){
// PUT to /users/:id
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

function userDelete( req, res, next ){
  // DELETE /user/:id
  User
    .findById(req.params.id)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

//---------- APPLICATION-----------//
function addUserGrit( req, res, next ){
  // POST /users/:id/grit
  User
    .findById(req.params.id)
    .then(user => {
      user.dailyGrit.push(req.body);
      return user.save(); // NOTE: may need to populate programs and follow arrays here again
    })
    .then(user => res.json(user))
    .catch(next);
  // pushes an object into the daily grit array
  // body needs to be an object containing a date and a grit number
}

function updateExercisePlan( req, res, next ){
  console.log('req.body is', req.body);
  User
    .findById(req.params.id)
    .then(user => {
      user.exercisePlan.pop();
      user.exercisePlan.push(req.body.exercisePlanId);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}


//------------- SOCIAL ------------//
function userFollowDelete( req, res, next ){
  // DELETE to /users/:userId/follow   with body of user to follow;
  //REQ.BODY IS THE FOLLOWED USER
  //REQ.PARAMS.ID IS THE USER
  console.log('the req.body is: ', req.body);
  User
    .findById(req.params.userId)
    .then( user => {
      user.following = user.following.filter(followed => followed._id.toString() !== req.body.id );
      user.save();
      return User.findById( req.body.id );
    })
    .then(user2 => {
      //got the followed user, filter out the user
      user2.followers = user2.followers.filter(follower => follower._id.toString() !== req.params.userId );
      return user2.save();
    })
    .then(user2 => res.json(user2))
    .catch(next);
  //remove the user from the other users followers array
  //remove the other user from the users following array
}

function userFollowCreate( req, res, next ){
  // POST to /users/:userId/follow   with body of user to follow;
  User
    .findById(req.params.userId)
    .then(user => {
      user.following.push(req.body.id);  // NOTE: is req.body.id still available
      user.save(); // NOTE: may need to populate followers and programs here
      return User.findById( req.body.id );
    })
    .then( user2 => {
      //add user to
      user2.followers.push(req.params.userId);
      return user2.save();
      //get the other user
    })
    .then(user2 => res.status(201).json(user2))
    .catch(next);
  //add the other user to the users following array
  //add the user to the other users followers array
}

function userFollowIndex( req, res, next ){
  // GET /users/:id/follow

  // get the user model populate it its follower and following arrays
}

module.exports = {
  //primary user routes
  index: userIndex,
  show: userShow,
  update: userUpdate,
  delete: userDelete,
  // patch: userPatch,

  // Application
  createGrit: addUserGrit,
  updateExercisePlan: updateExercisePlan,

  //social
  createFollow: userFollowCreate,
  deleteFollow: userFollowDelete,
  followIndex: userFollowIndex   // NOTE: this could be the same as GET users
};
