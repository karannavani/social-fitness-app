const mongoose = require('mongoose');

//MODELS
const User = require('../models/user');
const ExercisePlan = require('../models/exercisePlan');
const Feed = require('../models/feed');
const Challenge = require('../models/challenge');

//DEPENDANCIES
const moment = require('moment');
const Chance = require('chance');
const chance = new Chance();

//MONGOOSE CONNECTION
const { dbUri } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbUri);

// GLOGBAL VARIABLE
const today = moment().unix();
const dayInSeconds = 86400;

const userIds = [
  '5b91752666708bc8b1622705', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708', '5b91752666708bc8b1622709',
  '5b91752666708bc8b162270a', '5b91752666708bc8b162270b', '5b91752666708bc8b162270c', '5b91752666708bc8b162270d', '5b91752666708bc8b162270e',
  '5b91752666708bc8b162271f', '5b91752666708bc8b1622710', '5b91752666708bc8b1622711', '5b91752666708bc8b1622712', '5b91752666708bc8b1622713',
  '5b91752666708bc8b1622714', '5b91752666708bc8b1622715', '5b91752666708bc8b1622716', '5b91752666708bc8b1622717', '5b91752666708bc8b1622718',
  '5b91752666708bc8b1622719', '5b91752666708bc8b162271a'
]; //60 ids

/////////////////////////////////////////////////////////////////////
////////////----------CREATE  USERS-----------///////////////////////
/////////////////////////////////////////////////////////////////////

function randomUserId(){
  const randomIndex = Math.floor(Math.random() * userIds.length/5);
  return mongoose.Types.ObjectId(userIds[randomIndex]);
  // return userIds[randomIndex];
}

function randomTribeName(){
  const tribeNames = [
    'All Naturals', 'Inbetweeners', 'Gargantuans',
    'All Naturals', 'Inbetweeners', 'Gargantuans',
    'All Naturals', 'Inbetweeners', 'Gargantuans',
    'All Naturals', 'Inbetweeners', 'Gargantuans'
  ];
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
  for(let i = 3; i < userIds.length; i++ ){
    otherUserData.push(
      {
        _id: userIds[i],
        username: chance.first() + randomAge(),
        email: chance.email(),
        password: 'pass',
        tribe: randomTribeName(),
        firstName: chance.first(),
        surname: chance.last(),
        age: randomAge(),
        height: randomHeight(),
        heightUnit: 'cms',
        weight: randomWeight(),
        weightUnit: 'kgs',
        imageUrl: chance.avatar({protocol: 'https'}),
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
//////////-----------CREATE CHALLENGES--------///////////////////////
/////////////////////////////////////////////////////////////////////

const challengeData = [
  {
    name: '10km Run',
    type: 'Distance',
    distance: 10,
    challengeGrit: 60
  },
  {
    name: '5km Run',
    type: 'Distance',
    distance: 5,
    challengeGrit: 30
  },
  {
    name: '30min Swim',
    type: 'Timed',
    time: 30,
    challengeGrit: 30
  },
  {
    name: '1hr Swim',
    type: 'Timed',
    time: 60,
    challengeGrit: 60
  },
  {
    name: '100 Push Ups',
    type: 'Body Weight Exercise',
    reps: 100,
    challengeGrit: 30
  },
  {
    name: '50 Push Ups',
    type: 'Body Weight Exercise',
    reps: 50,
    challengeGrit: 15
  },
  {
    name: '50km Cycling',
    type: 'Distance',
    distance: 50,
    challengeGrit: 100
  },
  {
    name: '20km Cycling',
    type: 'Distance',
    distance: 20,
    challengeGrit: 40
  }
];

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
  '5b91752666708bc8b162277e', '5b91752666708bc8b162277f', '5b91752666708bc8b1622780', '5b91752666708bc8b1622781', '5b91752666708bc8b1622782',//60 current length of user id array

  '5b91752666708bc8b1622768', '5b91752666708bc8b1622769', '5b91752666708bc8b1622783', '5b91752666708bc8b1622784', '5b91752666708bc8b1622785',
  '5b91752666708bc8b1622786', '5b91752666708bc8b1622787', '5b91752666708bc8b1622789', '6b91752666708bc8b1622784', '6b91752666708bc8b1622785',
  '5b91752677708bc8b1622728', '5b91752676708bc8b1622729', '5b91752766708bc8b162272a', '5b91752676708bc8b162272b', '5b91752676708bc8b162272c',
  '5b91752677708bc8b162272d', '5b91752676708bc8b162272e', '5b91752766708bc8b162272f', '5b91752676708bc8b1622730', '5b91752676708bc8b1622731',
  '5b91752677708bc8b1622732', '5b91752676708bc8b1622733', '5b91752766708bc8b1622734', '5b91752676708bc8b1622735', '5b91752676708bc8b1622736',
  '5b91752677708bc8b1622737', '5b91752676708bc8b1622738', '5b91752766708bc8b1622739', '5b91752676708bc8b162273a', '5b91752676708bc8b162273b',
  '5b91752677708bc8b162273c', '5b91752676708bc8b162273d', '5b91752766708bc8b162273e', '5b91752676708bc8b162273f', '5b91752676708bc8b1622788',
  '5b91752677708bc8b1622740', '5b91752676708bc8b1622741', '5b91752766708bc8b1622742', '5b91752676708bc8b1622743', '5b91752676708bc8b1622744',
  '5b91752677708bc8b1622745', '5b91752676708bc8b1622746', '5b91752766708bc8b1622747', '5b91752676708bc8b1622748', '5b91752676708bc8b1622749',
  '5b91752677708bc8b162276a', '5b91752676708bc8b162276b', '5b91752766708bc8b162276c', '5b91752676708bc8b162276d', '5b91752676708bc8b162276e',
  '5b91752677708bc8b162276f', '5b91752676708bc8b1622770', '5b91752766708bc8b1622771', '5b91752676708bc8b1622772', '5b91752676708bc8b1622773',
  '5b91752677708bc8b1622774', '5b91752676708bc8b1622775', '5b91752766708bc8b1622776', '5b91752676708bc8b1622777', '5b91752676708bc8b1622778',
  '5b91752677708bc8b1622779', '5b91752676708bc8b162277a', '5b91752766708bc8b162277b', '5b91752676708bc8b162277c', '5b91752676708bc8b162277d',
  '5b91752677708bc8b162277e', '5b91752676708bc8b162277f', '5b91752766708bc8b1622780', '5b91752676708bc8b1622781', '5b91752676708bc8b1622782',
  '5b91752677708bc8b1622768', '5b91752676708bc8b1622769', '5b91752766708bc8b1622783', '5b91752676708bc8b1622784', '5b91752676708bc8b1622785',
  '5b91752677708bc8b1622786', '5b91752676708bc8b1622787', '5b91752766708bc8b1622789', '6b91752676708bc8b1622784', '6b91752676708bc8b1622785',
  '5b917526a7708bc8b1622728', '5b91752676708bb8b1622729', '5b91752767708bc8b162272a', '5b9175a676708bc8b162272c',
  '5b917526a7a08bc8b162272d', '5b91752676708bb8b162272e', '5b91752767708bc8b162272f', '5b9175a676708bc8b1622730', '5b917526767a8bc8b1622731',
  '5b917526a7708bc8b1622732', '5b91752676708bb8b1622733', '5b91752767708bc8b1622734', '5b9175a676708bc8b1622735', '5b917526767a8bc8b1622736',
  '5b917526a7708bc8b1622737', '5b91752676708bb8b1622738', '5b91752767708bc8b1622739', '5b9175a676708bc8b162273a', '5b917526767a8bc8b162273b',
  '5b917526a7708bc8b162273c', '5b91752676708bb8b162273d', '5b91752767708bc8b162273e', '5b9175a676708bc8b162273f', '5b917526767a8bc8b1622788',
  '5b917526a7708bc8b1622740', '5b91752676708bb8b1622741', '5b91752767708bc8b1622742', '5b9175a676708bc8b1622743', '5b917526767a8bc8b1622744',
  '5b917526a7708bc8b1622745', '5b91752676708bb8b1622746', '5b91752767708bc8b1622747', '5b9175a676708bc8b1622748', '5b917526767a8bc8b1622749',
  '5b917526a7708bc8b162276a', '5b91752676708bb8b162276b', '5b91752767708bc8b162276c', '5b9175a676708bc8b162276d', '5b917526767a8bc8b162276e',
  '5b917526a7708bc8b162276f', '5b91752676708bb8b1622770', '5b91752767708bc8b1622771', '5b9175a676708bc8b1622772', '5b917526767a8bc8b1622773',
  '5b917526a7708bc8b1622774', '5b91752676708bb8b1622775', '5b91752767708bc8b1622776', '5b9175a676708bc8b1622777', '5b917526767a8bc8b1622778',
  '5b917526a7708bc8b1622779', '5b91752676708bb8b162277a', '5b91752767708bc8b162277b', '5b9175a676708bc8b162277c', '5b917526767a8bc8b162277d',
  '5b917526a7708bc8b162277e', '5b91752676708bb8b162277f', '5b91752767708bc8b1622780', '5b9175a676708bc8b1622781', '5b917526767a8bc8b1622782',
  '5b917526a7708bc8b1622768', '5b91752676708bb8b1622769', '5b91752767708bc8b1622783', '5b9175a676708bc8b1622784', '5b917526767a8bc8b1622785',
  '5b917526a7708bc8b1622786', '5b91752676708bb8b1622787', '5b91752767708bc8b1622789', '6b9175a676708bc8b1622784', '6b917526767a8bc8b1622785',
  '5b917536a6708bc8b1622768', '6b91752666808bb8b1622769', '5b91752667808bc8b1622783', '5b9175a6668a8bc8b1622784', '5b017526867a8bc8b1622785',
  '5b917536a6708bc8b1622786', '6b91752666808bb8b1622787', '5b91752667808bc8b1622789', '6b9175a6668a8bc8b1622784', '6b017526867a8bc8b1622785',
  '5b917536a7708bc8b1622728', '6b91752676808bb8b1622729', '5b91752667808bc8b162272a', '5b9175a6768a8bc8b162272b', '5b017526867a8bc8b162272c'
];//60 ids

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
  const rest = [ true, false, false, false, true, true, false];
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

//ensures all users have a current program
function createActiveExercisePlan(){
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
      startDate: today,
      name: chance.word()
    });
  }

  return plan;
}

/////////////////////////////////////////////////////////////////////
////////////--CREATE HISTORIC EXERCISE PLAN---///////////////////////
/////////////////////////////////////////////////////////////////////

// returns an arrray of dates 3 days apart between the start date and stop date, descending
function getDates(startDate, stopDate) {
  const dateArray = [];
  const stopperDate = moment().subtract(stopDate, 'years');
  let currentDate = moment().subtract(startDate, 'years');

  while ( stopperDate <= currentDate) {
    dateArray.push( moment(currentDate).unix() );
    currentDate = moment(currentDate).subtract(3, 'days');
  }
  return dateArray;
}
//VARIABLE
const numberOfOrigionalPlan = 30;
const randomOrigionalStartDatesArray = getDates( 0.5, 1);
const randomAdoptedStartDatesArray = getDates( 0.2, 0.7 );

function randomStartDate(dateArray){
  const randomIndex =  Math.floor(Math.random() * dateArray.length);
  return dateArray[randomIndex];
}

function randomExerciseCompleted(){
  const exerciseCompleted = [ true, true, true, false, true, true, false];
  const randomIndex =  Math.floor(Math.random() * exerciseCompleted.length);
  return exerciseCompleted[randomIndex];
}



function randomExerciseId(){
  const randomIndex =  Math.floor(Math.random() * userIds.length + numberOfOrigionalPlan) + userIds.length;
  return exerciseIds[randomIndex];
}

function createHistoricExerciseDay(){
  const rest = restDay();
  if(rest){
    return { rest: true, exerciseCompleted: true };
  }else{
    return {
      rest: false,
      exerciseCompleted: randomExerciseCompleted(),
      time: randomExerciseTime(),
      intensity: randomExerciseItensity(),
      dailyGrit: randomDailyGrit()
    };
  }
}

function createOrigionalHistoricExercisePlans(){
  const plan = [];
  for(let i = userIds.length; i < userIds.length + numberOfOrigionalPlan; i++ ) {
    plan.push({
      day1: createHistoricExerciseDay(),
      day2: createHistoricExerciseDay(),
      day3: createHistoricExerciseDay(),
      day4: createHistoricExerciseDay(),
      day5: createHistoricExerciseDay(),
      day6: createHistoricExerciseDay(),
      day7: createHistoricExerciseDay(),
      _id: exerciseIds[i],
      user: randomUserId(),
      startDate: randomStartDate(randomOrigionalStartDatesArray),
      name: chance.word()
    });
  }
  return plan;
}

//
function createAdoptedHistoricExercisePlans(){
  const plan = [];
  for(let i = userIds.length + numberOfOrigionalPlan; i < exerciseIds.length; i++ ) {
    plan.push({
      day1: createHistoricExerciseDay(),
      day2: createHistoricExerciseDay(),
      day3: createHistoricExerciseDay(),
      day4: createHistoricExerciseDay(),
      day5: createHistoricExerciseDay(),
      day6: createHistoricExerciseDay(),
      day7: createHistoricExerciseDay(),
      _id: exerciseIds[i],
      user: randomUserId(),
      exercisePlanAdoptedFrom: randomExerciseId(), // NOTE: this should always be the original program id
      startDate: randomStartDate(randomAdoptedStartDatesArray),
      name: chance.word()
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
    heightUnit: 'cms',
    weight: 88,
    weightUnit: 'kgs',
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
    heightUnit: 'cms',
    weight: 53,
    weightUnit: 'kgs',
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
    heightUnit: 'cms',
    weight: 85,
    weightUnit: 'kgs',
    imageUrl: 'https://media.licdn.com/dms/image/C5603AQEprR3HW3VtTg/profile-displayphoto-shrink_200_200/0?e=1541635200&v=beta&t=dyjePRARTWJeHefh8F_M-DCHseC-rRs777WRVHYrdTs',
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

const activeExercisePlans = createActiveExercisePlan();
const origionalHistoricExercisePlans = createOrigionalHistoricExercisePlans();
const adoptedHistoricExercisePlans = createAdoptedHistoricExercisePlans();

const exerciseData = [...activeExercisePlans, ...origionalHistoricExercisePlans, ...adoptedHistoricExercisePlans];


////////////------SEED PROMISE CHAIN----------///////////////////////
ExercisePlan.collection.drop();
User.collection.drop();
Feed.collection.drop();
Challenge.collection.drop();

User.create(userData)
  .then(users => {
    console.log(`Created ${users.length} new users`);
    return ExercisePlan.create(exerciseData);
  })
  .then(exercisePlans => {
    console.log(`created ${exercisePlans.length} exercises`);
    return Challenge.create(challengeData);
  })
  .then(challenges => {
    console.log(`Created ${challenges.length} challenges`);
  })
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
