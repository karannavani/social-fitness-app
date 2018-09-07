const mongoose = require('mongoose');
const User = require('../models/user');
const ExercisePlan = require('../models/exercisePlan');
const moment = require('moment');

const { dbUri } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbUri);

const today = moment().unix();
const dayInSeconds = 86400;

const tribeNames = [
  'All Naturals', 'Inbetweeners', 'Gargantuans',
  'All Naturals', 'Inbetweeners', 'Gargantuans',
  'All Naturals', 'Inbetweeners', 'Gargantuans',
  'All Naturals', 'Inbetweeners', 'Gargantuans'
];

//////// NOTE: make sure to increase number of ids so can increase the number of seeds
const userIds = [
  '5b91752666708bc8b1622705', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708', '5b91752666708bc8b1622709',
  '5b91752666708bc8b162270a', '5b91752666708bc8b162270b', '5b91752666708bc8b162270c', '5b91752666708bc8b162270d', '5b91752666708bc8b162270e',
  '5b91752666708bc8b162271f', '5b91752666708bc8b1622710', '5b91752666708bc8b1622711', '5b91752666708bc8b1622712', '5b91752666708bc8b1622713',
  '5b91752666708bc8b1622714', '5b91752666708bc8b1622715', '5b91752666708bc8b1622716', '5b91752666708bc8b1622717', '5b91752666708bc8b1622718',
  '5b91752666708bc8b1622719', '5b91752666708bc8b162271a', '5b91752666708bc8b162271b', '5b91752666708bc8b162271c', '5b91752666708bc8b162271d',
  '5b91752666708bc8b162271e', '5b91752666708bc8b1622720', '5b91752666708bc8b1622721', '5b91752666708bc8b1622722', '5b91752666708bc8b1622723',
  '5b91752666708bc8b162274a', '5b91752666708bc8b162274b', '5b91752666708bc8b162274c', '5b91752666708bc8b162274d', '5b91752666708bc8b162274e',
  '5b91752666708bc8b162274f', '5b91752666708bc8b1622750', '5b91752666708bc8b1622751', '5b91752666708bc8b1622752', '5b91752666708bc8b1622753',
  '5b91752666708bc8b1622754', '5b91752666708bc8b1622755', '5b91752666708bc8b1622756', '5b91752666708bc8b1622757', '5b91752666708bc8b1622758',
  '5b91752666708bc8b1622759', '5b91752666708bc8b162275a', '5b91752666708bc8b162275b', '5b91752666708bc8b162275c', '5b91752666708bc8b162275d',
  '5b91752666708bc8b162275e', '5b91752666708bc8b162275f', '5b91752666708bc8b1622760', '5b91752666708bc8b1622761', '5b91752666708bc8b1622762',
  '5b91752666708bc8b1622763', '5b91752666708bc8b1622764', '5b91752666708bc8b1622765', '5b91752666708bc8b1622766', '5b91752666708bc8b1622767',
  '5b91752666708bc8b1622768', '5b91752666708bc8b1622769'
]; //30 ids

const exerciseIds = [
  '5b91752666708bc8b1622728', '5b91752666708bc8b1622729', '5b91752666708bc8b162272a', '5b91752666708bc8b162272b', '5b91752666708bc8b162272c',
  '5b91752666708bc8b162272d', '5b91752666708bc8b162272e', '5b91752666708bc8b162272f', '5b91752666708bc8b1622730', '5b91752666708bc8b1622731',
  '5b91752666708bc8b1622732', '5b91752666708bc8b1622733', '5b91752666708bc8b1622734', '5b91752666708bc8b1622735', '5b91752666708bc8b1622736',
  '5b91752666708bc8b1622737', '5b91752666708bc8b1622738', '5b91752666708bc8b1622739', '5b91752666708bc8b162273a', '5b91752666708bc8b162273b',
  '5b91752666708bc8b162273c', '5b91752666708bc8b162273d', '5b91752666708bc8b162273e', '5b91752666708bc8b162273f', '5b91752666708bc8b1622788',
  '5b91752666708bc8b1622740', '5b91752666708bc8b1622741', '5b91752666708bc8b1622742', '5b91752666708bc8b1622743', '5b91752666708bc8b1622744',
  '5b91752666708bc8b1622745', '5b91752666708bc8b1622746', '5b91752666708bc8b1622747', '5b91752666708bc8b1622748', '5b91752666708bc8b1622749',
  '5b91752666708bc8b162276a', '5b91752666708bc8b162276b', '5b91752666708bc8b162276c', '5b91752666708bc8b162276d', '5b91752666708bc8b162276e',
  '5b91752666708bc8b162276f', '5b91752666708bc8b1622770', '5b91752666708bc8b1622771', '5b91752666708bc8b1622772', '5b91752666708bc8b1622773',
  '5b91752666708bc8b1622774', '5b91752666708bc8b1622775', '5b91752666708bc8b1622776', '5b91752666708bc8b1622777', '5b91752666708bc8b1622778',
  '5b91752666708bc8b1622779', '5b91752666708bc8b162277a', '5b91752666708bc8b162277b', '5b91752666708bc8b162277c', '5b91752666708bc8b162277d',
  '5b91752666708bc8b162277e', '5b91752666708bc8b162277f', '5b91752666708bc8b1622780', '5b91752666708bc8b1622781', '5b91752666708bc8b1622782',
  '5b91752666708bc8b1622783', '5b91752666708bc8b1622784', '5b91752666708bc8b1622785', '5b91752666708bc8b1622786', '5b91752666708bc8b1622787',
  '5b91752666708bc8b1622789'
];


function randomNumber(){
  return Math.floor(Math.random() * 10000000000000);
}

/////////////////////////////////////////////////////////////////////
////////////----------CREATE  USERS-----------///////////////////////
/////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////
////////////----------CREATE  GRIT------------///////////////////////
/////////////////////////////////////////////////////////////////////
function randomDailyGrit(){
  return Math.floor(Math.random() * 60);
}

// NOTE: grit date should go backwards in time one day per cycle [DONE]

function addGrit(){
  const dailyGrit = [];
  let startDateUnix = moment().unix();
  const randomIndex = Math.floor(Math.random() * 300) + 60;
  // IDEA: make the interval random to get varing number of [DONE]
  for(let i = 0; i < randomIndex; i++ ){
    dailyGrit.push({date: `${startDateUnix}`, grit: randomDailyGrit()});
    startDateUnix -= dayInSeconds;
  }
  return dailyGrit;
}

/////////////////////////////////////////////////////////////////////
////////////-------CREATE EXERCISE PLAN-------///////////////////////
/////////////////////////////////////////////////////////////////////

// NOTE: talk to Karan about saving only unix time dates as numbers then formatting them where necessary
// NOTE: need to have historircal exercise plans for users. start date was > days since today minimum

function randomExerciseTime(){
  return Math.floor(Math.random() * 60) + 20;
}

function randomExerciseItensity(){
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
  const rest = [ false, true, false, false, true, false, false];
  const randomIndex =  Math.floor(Math.random() * rest.length);

  return rest[randomIndex];
}

function createExerciseDay(){
  const rest = restDay();
  if(rest){
    return { rest: true, exerciseCompleted: true };
  }else{
    return {
      rest: false,
      exerciseCompleted: null,
      time: randomExerciseTime(),
      intensity: randomExerciseItensity()
    };
  }
}

function createExercisePlan(){
  const plan = [];
  for(let i = 0; i < userIds.length; i++ ) {
    plan.push({
      day1: createExerciseDay(),
      day2: createExerciseDay(),
      day3: createExerciseDay(),
      day4: createExerciseDay(),
      day5: createExerciseDay(),
      day6: createExerciseDay(),
      day7: createExerciseDay(),
      _id: exerciseIds[i],
      user: userIds[i],
      exercisePlanAdoptedFrom: userIds[i + 1],
      startDate: today
    });
  }

  return plan;
}

/////////////////////////////////////////////////////////////////////
////////////--------------DATA----------------///////////////////////
/////////////////////////////////////////////////////////////////////
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

const exerciseData = createExercisePlan();


////////////------SEED PROMISE CHAIN----------///////////////////////
ExercisePlan.collection.drop();
User.collection.drop();

User.create(userData)
  .then(users => {
    console.log(`Created ${users.length} new users`);
    return ExercisePlan.create(exerciseData);
  })
  .then(exercisePlans => console.log(`created ${exercisePlans.length} exercises`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
