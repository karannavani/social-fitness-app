const mongoose = require('mongoose');


const User = require('../models/user');
const ExercisePlan = require('../models/exercisePlan');

const { dbUri } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbUri);

const userData= [
  {
    username: 'Rennzie',
    email: 'rnnsea001@gmail.com',
    password: 'pass',
    tribe: 'All Naturals',
    firstName: 'Sean',
    surname: 'Rennie',
    age: 28,
    height: 191,
    heightUnit: 'cm\'s',
    weight: 88,
    weightUnit: 'kg\'s',
    imageUrl: 'https://media.licdn.com/dms/image/C4D03AQE0THE9Yt64RQ/profile-displayphoto-shrink_200_200/0?e=1541635200&v=beta&t=j6-dluvDMqp9RDLoiBuYWMKEAwSpLV9gb0Jo2UHBR2k',
    followers: [],
    following: []

  }, {
    username: 'Karan',
    email: 'kknavani@gmail.com',
    password: 'pass',
    tribe: 'Inbetweeners',
    firstName: 'Karan',
    surname: 'Navani',
    age: 20,
    height: 167,
    heightUnit: 'cm\'s',
    weight: 53,
    weightUnit: 'kg\'s',
    imageUrl: 'https://media.licdn.com/dms/image/C5603AQEetSeaXLe-pg/profile-displayphoto-shrink_200_200/0?e=1541635200&v=beta&t=aHSY52Eqt6b3r_RR5bpcJ4WPSJOPdFFD-wrbH9vYGss',
    followers: [],
    following: []

  }, {
    username: 'TrimHall',
    email: 'tah.developer@gmail.com',
    password: 'pass',
    tribe: 'Gargantuans',
    firstName: 'Tristan',
    surname: 'Hall',
    age: 32,
    height: 172,
    heightUnit: 'cm\'s',
    weight: 85,
    weightUnit: 'kg\'s',
    imageUrl: 'https://media.licdn.com/dms/image/C5603AQEprR3HW3VtTg/profile-displayphoto-shrink_200_200/0?e=1541635200&v=beta&t=dyjePRARTWJeHefh8F_M-DCHseC-rRs777WRVHYrdTs',
    followers: [],
    following: []

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

ExercisePlan.collection.drop();
User.collection.drop();


let _exercisePlans;
let _users;

User.create(userData)
  .then(users => {
    exerciseData.forEach(exercise => {
      const randomIndex = Math.floor(Math.random() * users.length);
      exercise.user = users[randomIndex]._id;
    });

    _users = users;

    console.log(`Created ${users.length} new users`);
    return ExercisePlan.create(exerciseData);
  })
  .then(exercisePlans => {
    console.log(`created ${exercisePlans.length} exercises`);
    _exercisePlans = exercisePlans;

    return User.findById(_users[0]._id);
  })
  .then(user => {
    user.exercisePlan.push(_exercisePlans[0]);
    _users.forEach(otherUser => {
      user.followers.push(otherUser._id);
    } )

    user.save();
    return User.findById(_users[1]._id);
  })
  .then(user => {
    user.exercisePlan.push(_exercisePlans[1]);
    user.save();
    return User.findById(_users[2]._id);
  })
  .then(user => {
    user.exercisePlan.push(_exercisePlans[0]);
    user.save();
    return User.find();
  })
  .then(users => console.log(`Updated ${users.length} new users`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
