/* globals describe, it, api, expect, beforeEach */

const ExercisePlan = require('../../../models/exercisePlan');
const User = require('../../../models/user');
const moment = require('moment');
const today = moment().unix();

const testUser = {
  _id: '5b91752666708bc8b1622705',
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
  exercisePlan: '5b91752666708bc8b1622728'
};

const exercisePlanData = [
  {
    day1: {
      rest: false,
      time: 20,
      intensity: 'Low'
    },
    day2: {
      rest: true
    },
    day3: {
      rest: false,
      time: 20,
      intensity: 'Low'
    },
    day4: {
      rest: false,
      time: 60,
      intensity: 'Medium'
    },
    day5: {
      rest: true
    },
    day6: {
      rest: false,
      time: 60,
      intensity: 'Low'
    },
    day7: {
      rest: false,
      time: 62,
      intensity: 'High'
    },
    user: '5b91752666708bc8b1622705', //require a user plan
    startDate: today, //require a unix start date
    name: 'TestPlan1',
    _id: '5b91752666708bc8b1622728'
  },{
    day1: {
      rest: false,
      time: 20,
      intensity: 'High'
    },
    day2: {
      rest: true
    },
    day3: {
      rest: false,
      time: 20,
      intensity: 'Low'
    },
    day4: {
      rest: false,
      time: 60,
      intensity: 'Medium'
    },
    day5: {
      rest: true
    },
    day6: {
      rest: false,
      time: 60,
      intensity: 'Medium'
    },
    day7: {
      rest: false,
      time: 62,
      intensity: 'High'
    },
    user: '5b91752666708bc8b1622705', //require a user plan
    startDate: today, //require a unix start date
    name: 'TestPlan2',
    _id: '5b91752666708bc8b1622729'
  }
];

const exercisePlanId = '5b91752666708bc8b1622728';

describe('GET /exerciseplans', () => {  //testing the exercise show route
  //load event data before each test
  beforeEach(done => {
    ExercisePlan.remove({})
      .then(() => ExercisePlan.create(exercisePlanData))
      .then(() => {
        return User.remove({});
      })
      .then(() => User.create(testUser))
      .then(()=> done());
  });

  it('should return a 200 response', done => {
    api.get('/api/exerciseplans')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get('/api/exerciseplans')
      .end((err, res) => {
        expect(res.body).to.be.an('object'); // NOTE: res.body returns an object even without data
        done();
      });
  });

  it('should return the correct data', done => {
    api.get('/api/exerciseplans')
      .end((err, res) => {
        //get the correct seed data to compare //filter returns an array
        const testingExercisePlan = exercisePlanData.filter(exercisePlan => exercisePlan.name === res.body.name)[0];
        //expectations are
        expect(res.body.day1.rest).to.eq(testingExercisePlan.day1.rest);
        expect(res.body.user._id.toString()).to.eq(testingExercisePlan.user); // NOTE: this should populate the user.
        expect(res.body.startDate).to.eq(testingExercisePlan.startDate);
        expect(res.body.startDate).to.be.an('number');

        done();
      });
  });

});
