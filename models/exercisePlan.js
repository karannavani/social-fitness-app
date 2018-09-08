const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const moment = require('moment');

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

// make sure the virtuals get added
exercisePlanSchema.set('toObject', { virtuals: true });
exercisePlanSchema.set('toJSON', { virtuals: true });

//VIRTUALS
exercisePlanSchema.virtual('formattedStartDate')
  .get(function(){
    return moment.unix(this.startDate).format('DD/MM/YYYY');
  });

exercisePlanSchema.virtual('intensityAvg')
  .get(function(){
    const allIntensities = [];
    let lowCount = 0;
    let mediumCount = 0;
    let highCount = 0;
    // add all intensities into an array
    for(let i = 1; i < 8; i++){
      if(this[`day${i}`].intensity){
        switch(this[`day${i}`].intensity){
          case 'Low':
            lowCount ++;
            break;
          case 'Medium':
            mediumCount ++;
            break;
          case 'High':
            highCount ++;
            break;
        }
        allIntensities.push(this[`day${i}`].intensity);
      }
    }

    const avgInt = Math.floor((lowCount + mediumCount + highCount)/3);

    switch(avgInt){
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
        return 'Low';
    }
  });

//get day intensity, if medium, push 2 into an array etc
//push into an array
//count how many of each
// const value = this.state.exercises[`day${i}`];


exercisePlanSchema.virtual('totalTime')
//get each days exercise time
//put them into an array
//reduce the array and return the toa


exercisePlanSchema.virtual('workoutTimeAvg')


exercisePlanSchema.virtual('completedDays')


exercisePlanSchema.virtual('restDays')



// LIFECYCLE HOOKS
//  set the date for each day based on the start date prior to saving
//  NOTE: might be worth moving the program day logic here if we need day dates on more than one place

module.exports = mongoose.model('ExercisePlan', exercisePlanSchema);
