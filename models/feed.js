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
*      workout logged:        Name of plan, plan id, grit earned (workout summary),
*      exerciseplan create:   Name of plan, plan id, available grit from program, tribe of creator
*      exerciseplan adopted:  Name of plan, plan id, available grit from program, number of adoptions for that program
*      user registration:     Users tribe,
*      tribe change:          New tribe, old tribe
*      update to users details(similiar to register new user): what the update was,
*
*----------  MVP+   -----------*
*   Milestones: Grit reached, maintained average grit,
*/

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ObjectId = mongoose.Schema.Types.ObjectId;

const modelTypeEnums = [
  'logWorkout', // NOTE:
  'createPlan',
  'adoptPlan',
  'completePlan',
  'createChallenge',
  'completeChallenge',
  'tribeChange',
  'register',
  'follow'
];

const feedSchema = new mongoose.Schema({
  user: { type: ObjectId, required: true, ref: 'User' },     // NOTE: populated
  type: { type: String, enum: modelTypeEnums, requried: true },

  // logWorkout - create/adopt plan
  // NOTE: if we give our own ID then we can access the populated virtuals for each plan
  time: Number,
  intensity: String,
  grit: Number,
  exercisePlanName: String, // NOTE: can get this out of the populated plan
  exercisePlanId: { type: ObjectId, ref: 'ExercisePlan' }, // NOTE: populate this to get all the workout details
  exercisePlanAdoptedFromId: { type: ObjectId, ref: 'ExercisePlan' },

  // follow
  followedUserId: { type: ObjectId, ref: 'User' } // NOTE: populate this if available


}, {timestamps: true});

// Plugins
feedSchema.plugin(mongoosePaginate);


// make sure the virtuals get added
feedSchema.set('toObject', { virtuals: true });
feedSchema.set('toJSON', { virtuals: true });

// VIRTUALS

feedSchema.virtual('daysAgoCreated')
  .get(function(){
    const date2 = new Date();

    // Convert both dates to milliseconds
    const date1Ms = this.createdAt.getTime();
    const date2Ms = date2.getTime();

    // Calculate the difference in milliseconds
    const timeDifference = date2Ms - date1Ms;
    const oneMinute = 1000*60;
    const oneHour = oneMinute*60;
    const oneDay = oneHour*24;
    const oneYear = oneDay*365;

    const daysAgo = timeDifference/oneDay;
    const hoursAgo = timeDifference/oneHour;
    const minutesAgo = timeDifference/oneMinute;

    if(daysAgo > 365){
      return `${Math.round(daysAgo*oneYear)}Yrs Ago`;
    }else if(daysAgo >= 1){
      return `${Math.round(daysAgo)} Days Ago`;
    }else if(hoursAgo >= 1){
      return `${Math.round(hoursAgo)} Hours Ago`;
    }else if(minutesAgo >= 1){
      return `${Math.round(minutesAgo)} Minutes Ago`;
    }else{
      return 'Now';
    }
  });

module.exports = mongoose.model('Feed', feedSchema);
