const mongoose = require('mongoose');


const User = require('../models/user');
const Exercise = require('../models/exercise');

const { dbUri } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbUri);

const userData= [
  {
    username: 'Rennzie',
    email: 'rnnsea001@gmail.com',
    password: 'pass',
    tribe: 'All Naturals'
  },
  {
    username: 'Knevani',
    email: 'kknevani@gmail.com@gmail.com',
    password: 'pass',
    tribe: 'Inbetweeners'
  },
  {
    username: 'Trimhall',
    email: 'tah.developer@gmail.com',
    password: 'pass',
    tribe: 'Gargantuans'
  }
];

const exerciseData = [
  {
    // user: { type: mongoose.Schema.ObjectId, ref: 'User' }, //references the user model
    // adoptedFrom: String, //will have the program id
    dayOne: {
      exerciseCompleted: true,
      time: 60,
      intensity: 'Medium'
    },
    dayTwo: {
      exerciseCompleted: true,
      time: 30,
      intensity: 'Low'
    },
    dayThree: {
      exerciseCompleted: null,
      time: 40,
      intensity: 'Medium'
    },
    dayFour: {
      exerciseCompleted: null,
      time: 50,
      intensity: 'High'
    },
    dayFive: {
      exerciseCompleted: false,
      time: 40,
      intensity: 'Medium'
    },
    daySix: {
      exerciseCompleted: false,
      time: 60,
      intensity: 'High'
    },
    daySeven: {
      exerciseCompleted: true,
      time: 100,
      intensity: 'High'
    },
    daysLogged: ['02/09/2018', '03/09/2018', '04/09/2018']
  },
  {
    // user: { type: mongoose.Schema.ObjectId, ref: 'User' }, //references the user model
    // adoptedFrom: String, //will have the program id
    dayOne: {
      exerciseCompleted: false,
      time: 80,
      intensity: 'Medium'
    },
    dayTwo: {
      exerciseCompleted: true,
      time: 20,
      intensity: 'Low'
    },
    dayThree: {
      exerciseCompleted: false,
      time: 90,
      intensity: 'Medium'
    },
    dayFour: {
      exerciseCompleted: null,
      time: 50,
      intensity: 'High'
    },
    dayFive: {
      exerciseCompleted: true,
      time: 70,
      intensity: 'Medium'
    },
    daySix: {
      exerciseCompleted: false,
      time: 60,
      intensity: 'High'
    },
    daySeven: {
      exerciseCompleted: true,
      time: 100,
      intensity: 'High'
    },
    daysLogged: ['01/09/2018', '03/09/2018', '05/09/2018']
  }
];

Exercise.collection.drop();
User.collection.drop();

User.create(userData)
  .then(users => {
    console.log(`Created ${users.length} new users`);
    return Exercise.create(exerciseData);
  })
  .then(exercises => console.log(`created ${exercises.length} exercises`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
