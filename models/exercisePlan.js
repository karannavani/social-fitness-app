const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const exercisePlanSchema = new mongoose.Schema({
  day1: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  day2: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  day3: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  day4: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  day5: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  day6: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  day7: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String
  },
  user: { type: ObjectId, ref: 'User' }, //references the user model
  exercisePlanAdoptedFrom: { type: ObjectId, ref: 'ExercisePlan' }, //will have the program id
  startDate: Number
}, { timestamps: true });

// LIFECYCLE HOOKS
  //set the date for each day based on the start date prior to saving

module.exports = mongoose.model('ExercisePlan', exercisePlanSchema);
