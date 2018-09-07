const mongoose = require('mongoose');
const User = require('../models/user');
const ExercisePlan = require('../models/exercisePlan');
const moment = require('moment');

const { dbUri } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbUri);

const today = moment().format('dddd, MMMM Do YYYY');

const tribeNames = [
  'All Naturals', 'Inbetweeners', 'Gargantuans',
  'All Naturals', 'Inbetweeners', 'Gargantuans',
  'All Naturals', 'Inbetweeners', 'Gargantuans',
  'All Naturals', 'Inbetweeners', 'Gargantuans'
];

const userIds = [
  '5b91752666708bc8b1622705', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708', '5b91752666708bc8b1622709',
  '5b91752666708bc8b162270a', '5b91752666708bc8b162270b', '5b91752666708bc8b162270c', '5b91752666708bc8b162270d', '5b91752666708bc8b162270e',
  '5b91752666708bc8b162271f', '5b91752666708bc8b1622710', '5b91752666708bc8b1622711', '5b91752666708bc8b1622712', '5b91752666708bc8b1622713',
  '5b91752666708bc8b1622714', '5b91752666708bc8b1622715', '5b91752666708bc8b1622716', '5b91752666708bc8b1622717', '5b91752666708bc8b1622718',
  '5b91752666708bc8b1622719', '5b91752666708bc8b162271a', '5b91752666708bc8b162271b', '5b91752666708bc8b162271c', '5b91752666708bc8b162271d',
  '5b91752666708bc8b162271e', '5b91752666708bc8b1622720', '5b91752666708bc8b1622721', '5b91752666708bc8b1622722', '5b91752666708bc8b1622723'
]; //30 ids

const exerciseIds = [
  '5b91752666708bc8b1622728', '5b91752666708bc8b1622729', '5b91752666708bc8b162272a', '5b91752666708bc8b162272b', '5b91752666708bc8b162272c',
  '5b91752666708bc8b162272d', '5b91752666708bc8b162272e', '5b91752666708bc8b162272f', '5b91752666708bc8b1622730', '5b91752666708bc8b1622731',
  '5b91752666708bc8b1622732', '5b91752666708bc8b1622733', '5b91752666708bc8b1622734', '5b91752666708bc8b1622735', '5b91752666708bc8b1622736',
  '5b91752666708bc8b1622737', '5b91752666708bc8b1622738', '5b91752666708bc8b1622739', '5b91752666708bc8b162273a', '5b91752666708bc8b162273b',
  '5b91752666708bc8b162273c', '5b91752666708bc8b162273d', '5b91752666708bc8b162273e', '5b91752666708bc8b162273f', 
  '5b91752666708bc8b1622740', '5b91752666708bc8b1622741', '5b91752666708bc8b1622742', '5b91752666708bc8b1622743', '5b91752666708bc8b1622744',
  '5b91752666708bc8b1622745', '5b91752666708bc8b1622746', '5b91752666708bc8b1622747', '5b91752666708bc8b1622748', '5b91752666708bc8b1622749'
];

//////////////////////////////
//////// NOTE: make sure to increase number of ids so can increase the number of seeds

function randomNumber(){
  return Math.floor(Math.random() * 10000000000000);
}

function randomTribeName(){
  const randomIndex = Math.floor(Math.random() * tribeNames.length);
  return tribeNames[randomIndex];
}

function randomAge(){
  return Math.floor(Math.random() * 50) + 15;
}

function randomHeight(){
  return Math.floor(Math.random() * 50) + 150;
}

function randomWeight(){
  return Math.floor(Math.random() * 50) + 50;
}

function randomDailyGrit(){
  return Math.floor(Math.random() * 50);
}

function randomExerciseTime(){
  return Math.floor(Math.random() * 60) + 20;
}

function randomItensity(){
  const intensities = [
    'Low', 'Medium', 'High',
    'Low', 'Medium', 'High',
    'Low', 'Medium', 'High',
    'Low', 'Medium', 'High'
  ];
  const randomIndex =  Math.floor(Math.random() * intensities.length);

  return intensities[randomIndex];
}

function restDay(){
  const rest = [ true, true, false, false, false, false];
  const randomIndex =  Math.floor(Math.random() * rest.length);

  return rest[randomIndex];
}

function addGrit(){
  const dailyGrit = [];
  for(let i = 0; i < 100; i++ ){
    dailyGrit.push({date: `${randomDailyGrit()}`, grit: randomDailyGrit()});
  }
  return dailyGrit;
}

function addOtherUser(){
  const otherUserData = [];
  for(let i = 3; i < userIds.length - 3; i++ ){
    otherUserData.push(
      {
        _id: userIds[i],
        username: `username${randomNumber()}`,
        email: `random${randomNumber()}@email.com`,
        password: 'pass',
        tribe: randomTribeName(),
        firstName: `First${randomNumber()}`,
        surname: `Last${randomNumber()}`,
        age: randomAge(),
        height: randomHeight(),
        heightUnit: 'cm\'s',
        weight: randomWeight(),
        weightUnit: 'kg\'s',
        imageUrl: 'https://i0.wp.com/ebus.ca/wp-content/uploads/2017/08/profile-placeholder.jpg?ssl=1',
        followers: [],
        following: [userIds[0], userIds[2], userIds[1]],
        exercisePlan: exerciseIds[i],
        dailyGrit: addGrit()
      }
    );
  }
  return otherUserData;

}

function createDay(){
  const rest = restDay();
  if(rest){
    return { rest: true };
  }else{
    return {
      rest: false,
      exerciseCompleted: true,
      time: randomExerciseTime(),
      intensity: randomItensity()
    };
  }
}

function createPlan(){
  const plan = [];
  for(let i = 0; i < userIds.length; i++ ) {
    plan.push({
      dayOne: createDay(),
      dayTwo: createDay(),
      dayThree: createDay(),
      dayFour: createDay(),
      dayFive: createDay(),
      daySix: createDay(),
      daySeven: createDay(),
      _id: exerciseIds[i],
      user: userIds[i],
      exercisePlanAdoptedFrom: userIds[i + 1],
      startDate: today
    });
  }

  return plan;
}


const primaryUserData= [
  {
    _id: userIds[0],
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
    followers: [userIds[1], userIds[2], userIds[3], userIds[4], userIds[5], userIds[6],
      userIds[7], userIds[8], userIds[9], userIds[10], userIds[11], userIds[12], userIds[13],
      userIds[14], userIds[15], userIds[16], userIds[17], userIds[18], userIds[19], userIds[20],
      userIds[21], userIds[23], userIds[24], userIds[25], userIds[26], userIds[27], userIds[28], userIds[29]],
    following: [userIds[1], userIds[2]],
    exercisePlan: exerciseIds[0],
    dailyGrit: addGrit()
  }, {
    _id: userIds[1],
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
    followers: [userIds[0], userIds[2], userIds[3], userIds[4], userIds[5], userIds[6],
      userIds[7], userIds[8], userIds[9], userIds[10], userIds[11], userIds[12], userIds[13],
      userIds[14], userIds[15], userIds[16], userIds[17], userIds[18], userIds[19], userIds[20],
      userIds[21], userIds[23], userIds[24], userIds[25], userIds[26], userIds[27], userIds[28], userIds[29]],
    following: [userIds[0], userIds[2]],
    exercisePlan: exerciseIds[1],
    dailyGrit: addGrit()
  }, {
    _id: userIds[2],
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
    imageUrl: 'https://i0.wp.com/ebus.ca/wp-content/uploads/2017/08/profile-placeholder.jpg?ssl=1',
    followers: [userIds[0], userIds[1], userIds[3], userIds[4], userIds[5], userIds[6],
      userIds[7], userIds[8], userIds[9], userIds[10], userIds[11], userIds[12], userIds[13],
      userIds[14], userIds[15], userIds[16], userIds[17], userIds[18], userIds[19], userIds[20],
      userIds[21], userIds[23], userIds[24], userIds[25], userIds[26], userIds[27], userIds[28], userIds[29]],
    following: [userIds[0], userIds[1]],
    exercisePlan: exerciseIds[2],
    dailyGrit: addGrit()
  }
];

const otherUserData = addOtherUser();

const userData = [ ...primaryUserData, ...otherUserData ];

const exerciseData = createPlan();

// const exerciseData = [
//   {
//     // user: { type: mongoose.Schema.ObjectId, ref: 'User' }, //references the user model
//     // adoptedFrom: String, //will have the program id
//     dayOne: {
//       exerciseCompleted: true,
//       time: 60,
//       intensity: 'Medium'
//     },
//     dayTwo: {
//       exerciseCompleted: true,
//       time: 30,
//       intensity: 'Low'
//     },
//     dayThree: {
//       exerciseCompleted: null,
//       time: 40,
//       intensity: 'Medium'
//     },
//     dayFour: {
//       exerciseCompleted: null,
//       time: 50,
//       intensity: 'High'
//     },
//     dayFive: {
//       exerciseCompleted: false,
//       time: 40,
//       intensity: 'Medium'
//     },
//     daySix: {
//       exerciseCompleted: false,
//       time: 60,
//       intensity: 'High'
//     },
//     daySeven: {
//       exerciseCompleted: true,
//       time: 100,
//       intensity: 'High'
//     },
//     daysLogged: ['02/09/2018', '03/09/2018', '04/09/2018']
//   },
//   {
//     // user: { type: mongoose.Schema.ObjectId, ref: 'User' }, //references the user model
//     // adoptedFrom: String, //will have the program id
//     dayOne: {
//       exerciseCompleted: false,
//       time: 80,
//       intensity: 'Medium'
//     },
//     dayTwo: {
//       exerciseCompleted: true,
//       time: 20,
//       intensity: 'Low'
//     },
//     dayThree: {
//       exerciseCompleted: false,
//       time: 90,
//       intensity: 'Medium'
//     },
//     dayFour: {
//       exerciseCompleted: null,
//       time: 50,
//       intensity: 'High'
//     },
//     dayFive: {
//       exerciseCompleted: true,
//       time: 70,
//       intensity: 'Medium'
//     },
//     daySix: {
//       exerciseCompleted: false,
//       time: 60,
//       intensity: 'High'
//     },
//     daySeven: {
//       exerciseCompleted: true,
//       time: 100,
//       intensity: 'High'
//     },
//     daysLogged: ['01/09/2018', '03/09/2018', '05/09/2018']
//   }
// ];

ExercisePlan.collection.drop();
User.collection.drop();

User.create(userData)
  .then(users => {
    // exerciseData.forEach(exercise => {
    //   const randomIndex = Math.floor(Math.random() * users.length);
    //   exercise.user = users[randomIndex]._id;
    // });

    console.log(`Created ${users.length} new users`);
    return ExercisePlan.create(exerciseData);
  })
  .then(exercisePlans => console.log(`created ${exercisePlans.length} exercises`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
