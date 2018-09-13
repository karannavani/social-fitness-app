/* globals describe, it, api, expect, beforeEach */

const exercisePlanData = [
  {
    day1: {
      rest: false,
      exerciseCompleted: null,
      time: 60,
      intensity: 'Low'
    },
    day2: {
      rest: false,
      exerciseCompleted: null,
      time: 60,
      intensity: 'Low'
    },
    day3: {
      rest: false,
      exerciseCompleted: null,
      time: 60,
      intensity: 'Low'
    },
    day4: {
      rest: false,
      exerciseCompleted: null,
      time: 60,
      intensity: 'Low'
    },
    day5: {
      rest: false,
      exerciseCompleted: null,
      time: 60,
      intensity: 'Low'
    },
    day6: {
      rest: false,
      exerciseCompleted: null,
      time: 60,
      intensity: 'Low'
    },
    day7: {
      rest: false,
      exerciseCompleted: null,
      time: 60,
      intensity: 'Low'
    },
    user: userIds[i], //require a user plan
    startDate: today, //require a unix start date
    name: 'TestPlan1'
  }

]

const ExercisePlan = require('../../../models/exercisePlans');

let exercisePlanId;

describe('GET /exercisplans/:id', () => {  //testing the event index route
  //load event data before each test
  beforeEach(done => {
    ExercisePlan.remove({})
      .then(() => ExercisePlan.create(exercisePlanData))
      .then(exercisPlans => {
        console.log('The event id is', exercisPlans[0].id);
        exercisePlanId = exercisPlans[0].id;
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/exercisplans/${exercisePlanId}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/exercisplans/${exercisePlanId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object'); // NOTE: res.body returns an object even without data
        done();
      });
  });


  it('should return the correct data', done => {
    api.get(`/api/exercisplans/${exercisePlanId}`)
      .end((err, res) => {
        //get the correct seed data to compare //filter returns an array
        const testingExercisePlan = exercisePlanData.filter(exercisPlanTest => exercisPlanTest.eventTitle === res.body.name)[0];

        //expectations are
        // expect(res.body.capacity).to.eq(testingEvent.capacity);

        done();
      });
  });

});
