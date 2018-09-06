const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const exercisePlanSchema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User' }, //references the user model
  exercisePlanAdoptedFrom: { type: ObjectId, ref: 'ExercisePlan' }, //will have the program id
  startDate: String,
  day1: {
    day: Number,
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  day2: {
    day: Number,
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  day3: {
    day: Number,
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  day4: {
    day: Number,
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  day5: {
    day: Number,
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  day6: {
    day: Number,
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  day7: {
    day: Number,
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  daysLogged: [String] //if the activity for that day has been logged, push the date into this array
}, { timestamps: true });

// LIFECYCLE HOOKS
  //set the date for each day based on the start date prior to saving

module.exports = mongoose.model('ExercisePlan', exercisePlanSchema);
