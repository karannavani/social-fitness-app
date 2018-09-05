const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }, //references the user model 
  adoptedFrom: String, //will have the program id
  dayOne: {
    exerciseCompleted: Boolean,
    time: Number,
    intensity: String
  },
  dayTwo: {
    exerciseCompleted: Boolean,
    time: Number,
    intensity: String
  },
  dayThree: {
    exerciseCompleted: Boolean,
    time: Number,
    intensity: String
  },
  dayFour: {
    exerciseCompleted: Boolean,
    time: Number,
    intensity: String
  },
  dayFive: {
    exerciseCompleted: Boolean,
    time: Number,
    intensity: String
  },
  daySix: {
    exerciseCompleted: Boolean,
    time: Number,
    intensity: String
  },
  daySeven: {
    exerciseCompleted: Boolean,
    time: Number,
    intensity: String
  },
  days: [String] //if the activity for that day has been logged, push the date into this array
});

module.exports = mongoose.model('Exercise', exerciseSchema);
