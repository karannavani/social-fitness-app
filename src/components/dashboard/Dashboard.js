import React from 'react';
import axios from 'axios';
import Aside from './Aside';
import Feed from './Feed';
import moment from 'moment';
import Auth from '../../lib/Auth';

class Dashboard extends React.Component {
  state = {
    goRender: false,
    unloggedExercises: [],
    unloggedDays: []
  }
  // shareExercises = (exerciseData) =>{
  //   this.setState({ exerciseData }, console.log('dash data is', exerciseData));
  // }
  componentDidMount() {
    axios.get('/api/users/${Auth.currentUserId()}')
      .then(res => this.setState({ users: res.data, exerciseId: res.data.exercisePlan },
        () => this.getExercise()));
  }

  getExercise = () => { // sets the exercises from the current plan on the state
    axios.get(`/api/exerciseplans/${this.state.exerciseId}`)
      .then(res => this.setState({ exercises: res.data, goRender: true }, () => {
        console.log('exercises are', this.state.exercises);
        this.getProgram();
        // this.child.getParentData();
        // this.props.shareExercises(this.state.exercises);
      }
      ));
  }

  getProgram = () => {
    if (this.state.exercises) {
      const { exercises: { startDate } } = this.state; // getting startDate of the exercise
      // const today = moment.utc();
      // const tomorrow = moment.utc().add(1, 'days');
      const today = moment.utc().add(3, 'days'); //manual today for testing
      const tomorrow = moment.utc(today).add(1, 'days');//manual tomorrowfor testing

      for (let i = 1; i < 8; i++) {

        // generate 7 dates from the start date – these are the program dates
        const date = moment.utc(moment.unix(startDate)).add(i-1, 'days');
        // console.log('date is', date.format('DD/MM/YYYY'));

        // if a program date matches today's date, get the program at that index and set it as today's program
        if (date.format('DD/MM/YYYY') === today.format('DD/MM/YYYY')) {
          const value = this.state.exercises[`day${i}`];
          console.log('program for today is', value);
          this.setState({ programToday: value, programDay: `Day ${i}`, rest: value.rest });

          // saving the workout of the next day to the state
        } else if (date.format('DD/MM/YYYY') === tomorrow.format('DD/MM/YYYY') ) {
          const value = this.state.exercises[`day${i}`];
          this.setState({ programTomorrow: value, tomorrowRest: value.rest },
            () => this.child.getParentData());

        } else if(moment(date).isBefore(moment(today))) {

          console.log(`${date.format('DD/MM/YYYY')} is before ${today.format('DD/MM/YYYY')}`);
          this.checkUnlogged(this.state.exercises[`day${i}`], `Day ${i}`);
        }
      }
    }
  }

  checkUnlogged = (exercise, i) => {
    if (exercise.exerciseCompleted === null) {
      console.log('unlogged exercise is', exercise);
      this.state.unloggedDays.push(i);
      this.state.unloggedExercises.push(exercise);
      this.child.getParentData();
    }

  }

  render() {
    return(
      <div className="columns">
        {this.state.exercises && this.state.goRender &&
          <Aside
            exercises = {this.state.exercises}
            exerciseId = {this.state.exerciseId}
            programToday = {this.state.programToday}
            programDay = {this.state.programDay}
            programTomorrow = {this.state.programTomorrow}
            tomorrowRest =  {this.state.rest}
            rest = {this.state.rest}
            unloggedExercises = {this.state.unloggedExercises}
            unloggedDays = {this.state.unloggedDays}
            onRef={ref => (this.child = ref)}
            // shareExercises = {this.shareExercises}
          />
        }
        <Feed
          exercises = {this.state.exercises}
          onRef={ref => (this.child = ref)}
        />
      </div>
    );
  }
}

export default Dashboard;
