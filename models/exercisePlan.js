const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const exercisePlanSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' }, //references the user model
  programAdoptedFrom: String, //will have the program id
  startDate: String,
  dayOne: {
    rest: {type: Boolean, default: false },
    date: String,
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  dayTwo: {
    rest: {type: Boolean, default: false },
    date: String,
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  dayThree: {
    rest: {type: Boolean, default: false },
    date: String,
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  dayFour: {
    rest: {type: Boolean, default: false },
    date: String,
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  dayFive: {
    rest: {type: Boolean, default: false },
    date: String,
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  daySix: {
    rest: {type: Boolean, default: false },
    date: String,
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  daySeven: {
    rest: {type: Boolean, default: false },
    date: String,
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  daysLogged: [String] //if the activity for that day has been logged, push the date into this array
}, { timestamps: true });

// LIFECYCLE HOOKS
  //set the date for each day based on the start date prior to saving

module.exports = mongoose.model('ExercisePlan', exercisePlanSchema);
