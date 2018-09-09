const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const moment = require('moment');

const exercisePlanSchema = new mongoose.Schema({
  day1: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String,
    dailyGrit: Number
  },
  day2: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String,
    dailyGrit: Number
  },
  day3: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String,
    dailyGrit: Number
  },
  day4: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String,
    dailyGrit: Number
  },
  day5: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String,
    dailyGrit: Number
  },
  day6: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String,
    dailyGrit: Number
  },
  day7: {
    rest: {type: Boolean, default: false },
    exerciseCompleted: { type: Boolean, default: null},
    time: Number,
    intensity: String,
    dailyGrit: Number
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

// Returns the average intensity of the program as a string
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



// Returns the total exercise time required in a program
exercisePlanSchema.virtual('totalTime')
  .get( function() {
    const timesArray = [];
    for(let i = 1; i < 8; i++){
      if(this[`day${i}`].time){
        timesArray.push(this[`day${i}`].time);
      }
    }
    if(!timesArray.length){
      return null;
    }
    return timesArray.reduce((sum, time) => sum + time);
  });

exercisePlanSchema.virtual('workoutTimeAvg')
  .get( function() {
    const timesArray = [];
    for(let i = 1; i < 8; i++){
      if(this[`day${i}`].time){
        timesArray.push(this[`day${i}`].time);
      }
    }
    if(!timesArray.length){
      return null;
    }
    return Math.floor(timesArray.reduce((sum, time) => sum + time) / 7);
  });

// Returns the total exercise time required in a program
exercisePlanSchema.virtual('totalGrit')
  .get( function() {
    const gritArray = [];
    for(let i = 1; i < 8; i++){
      if(this[`day${i}`].dailyGrit){
        gritArray.push(this[`day${i}`].dailyGrit);
      }
    }
    if(!gritArray.length){
      return null;
    }
    return gritArray.reduce((sum, grit) =>{
      return sum + grit;
    }, 0);
  });

function calculateGrit(intensity, time){
  switch (intensity) {
    case 'low':
      return Math.floor((time/20)) * 5;
    case 'medium':
      return Math.floor((time/20)) * 10;
    case 'high':
      return Math.floor((time/20)) * 15;
  }
}

// Returns the total exercise time required in a program
exercisePlanSchema.virtual('totalAvailableGrit')
  .get( function(){
    const planAvailableGrit = [];

    for(let i = 1; i < 8; i++){

      if(this[`day${i}`].intensity){
        const dayIntensity = this[`day${i}`].intensity.toLowerCase();
        const dayTime = this[`day${i}`].time;
        const dailyAvailableGrit = calculateGrit(dayIntensity, dayTime );


        planAvailableGrit.push(dailyAvailableGrit);
      }
    }

    if(!planAvailableGrit.length){
      return null;
    }
    return planAvailableGrit.reduce((sum, grit) => sum + grit);
  });



exercisePlanSchema.virtual('completedDays')
  .get( function() {
    let completed = 0;
    for(let i = 1; i < 8; i++){
      if(this[`day${i}`].exerciseCompleted && !this[`day${i}`].rest){
        completed ++;
      }
    }
    return completed;
  });


exercisePlanSchema.virtual('restDays')
  .get( function() {
    let restDays = 0;
    for(let i = 1; i < 8; i++){
      if(this[`day${i}`].rest){
        restDays ++;
      }
    }
    return restDays;
  });


// LIFECYCLE HOOKS
//  set the date for each day based on the start date prior to saving
//  NOTE: might be worth moving the program day logic here if we need day dates on more than one place

module.exports = mongoose.model('ExercisePlan', exercisePlanSchema);
