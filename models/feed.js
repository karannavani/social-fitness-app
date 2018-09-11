//Collection of any user driven changes on any model
//  should apply to any create, update, register,
//  not limited by tribe at this point


/*  post requests need to include
*   USERID from driver(logged in user)
*   type of update:
*      workout logged,
*      exerciseplan create,
*      user registration,
*      tribe change,
*      update to users details(similiar to register new user),
*   details of the update
*      workout logged:        Name of plan, plan id, grit earned, if adopted or not
*      exerciseplan create:   Name of plan, plan id, available grit from program
*      exerciseplan adopted:  Name of plan, plan id, available grit from program, number of adoptions for that program
*      user registration:     Users tribe,
*      tribe change:          New tribe, old tribe
*      update to users details(similiar to register new user): what the update was,
*
*----------  MVP+   -----------*
*   Milestones: Grit reached, maintained average grit,
*/

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const modelTypeEnums = [
  'logWorkout',
  'createPlan',
  'adoptPlan',
  'createChallenge',
  'completeChallenge',
  'tribeChange',
  'register',
  'updateDetails'
];

const feedSchema = new mongoose.Schema({
  user: {type: ObjectId, required: true, ref: 'User'},     // NOTE: populated
  type: {type: String, enum: modelTypeEnums},

  // logWorkout - create/adopt plan
  // NOTE: if we give out own ID then we can access the populated virtuals for each plan
  time: Number,
  intensity: String,
  dailyEarnedGrit: Number,
  planName: String,
  planId: {type: ObjectId, ref: 'ExercisePlan'}, // NOTE: populate this to get all the workout details
  planAdoptedFromId: {type: ObjectId, ref: 'ExercisePlan'},

  //  register - details update
  // NOTE: if we have our own ID then we can access all the data, more important to know what has changed was
  firstNameChanged: {type: Boolean, default: false },
  surnameChanged: {type: Boolean, default: false },
  ageChanged: {type: Boolean, default: false },
  heightChanged: {type: Boolean, default: false },
  heightUnitChanged: {type: Boolean, default: false },
  weightChanged: {type: Boolean, default: false },
  weightUnitChanged: {type: Boolean, default: false },
  imageUrlChanged: {type: Boolean, default: false },

  // follow
  followId: { type: ObjectId, ref: 'User' } // NOTE: populate this if available


}, {timestamps: true});

module.exports = mongoose.model('Feed', feedSchema);
