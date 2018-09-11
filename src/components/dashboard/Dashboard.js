import React from 'react';
import axios from 'axios';
import Aside from './Aside';
import Feed from './Feed';
import SimpleDash from './SimpleDash';
import moment from 'moment';
import Auth from '../../lib/Auth';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  state = {
    goRender: false,
    unloggedExercises: [],
    unloggedDays: [],
    editProgram: false
  }
  // shareExercises = (exerciseData) =>{
  //   this.setState({ exerciseData }, console.log('dash data is', exerciseData));
  // }
  componentDidMount() {
    axios.get(`/api/users/${Auth.currentUserId()}`)
      .then(res => this.setState({ users: res.data, exerciseId: res.data.exercisePlan, userGrit: res.data.grit },
        () => {
          console.log('user is', this.state.users);

          if (this.state.exerciseId) {
            this.getExercise();
            this.setState({ simpleDash: false });
          }

          console.log('no exercises');
          this.setState({ simpleDash: true });
        }));

    const paginateOptions = {
      'userId': Auth.currentUserId(),
      'page': 1,
      'sort': { 'startDate': -1 },
      'limit': 1
    };
    axios.post('/api/exerciseplans/paginate', paginateOptions)
      .then(res => console.log(res.data));
  }

  getExercise = () => { // sets the exercises from the current plan on the state
    // NOTE: this should be run conditonally if there is no execiseplan for the user
    axios.get(`/api/exerciseplans/${this.state.exerciseId}`)
      .then(res => this.setState({ exercises: res.data, goRender: true }, () => {
        console.log('exercises are', this.state.exercises);
        this.getProgram();
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
      this.setState({ momentToday: moment(today).unix()});

      for (let i = 1; i < 8; i++) {

        // generate 7 dates from the start date – these are the program dates
        const date = moment.utc(moment.unix(startDate)).add(i-1, 'days');
        // console.log('date is', date.format('DD/MM/YYYY'));

        // if a program date matches today's date, get the program at that index and set it as today's program
        if (date.format('DD/MM/YYYY') === today.format('DD/MM/YYYY')) {
          const value = this.state.exercises[`day${i}`];
          this.setState({ programToday: value, programDay: `Day ${i}`, rest: value.rest });

          // saving the workout of the next day to the state
        } else if (date.format('DD/MM/YYYY') === tomorrow.format('DD/MM/YYYY') ) {
          const value = this.state.exercises[`day${i}`];
          this.setState({ programTomorrow: value, tomorrowRest: value.rest });

        } else if(moment(date).isBefore(moment(today))) {
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
    }

  }

  handleEdit = ({ target: { name, value } }) => { // handles exercise edit for that day
    const newState = this.state.programToday;
    newState[name] = value;
    this.setState({programToday: newState});
  }

  handleEditSubmit = ({ target }) => { // saves the edit to the exercise db or cancels it
    console.log('target is', target.id);
    const [id, day] = target.id.split(' ');
    console.log('day is', day);
    if (id === 'complete') {
      this.setState({ editProgram: false });
      axios.patch(`/api/exerciseplans/${this.state.exerciseId}`,
        {[day.toLowerCase()]: this.state.programToday});

    } else if (id === 'skip') {
      this.setState({ editProgram: false });
    }
  }

  handleProgramClick = ({ target }) => { // allows user to complete, edit and skip days
    // console.log('target is', target.id);
    const [id, day, grit] = target.id.split(' ');
    // console.log('day is ====>', day);
    // console.log('grit is ====>', grit);
    const newProgramState = this.state.exercises[day.toLowerCase()];
    const unloggedIndex = this.state.unloggedDays.indexOf(`Day ${day.slice(3)}`);

    switch (id) {

      case ('complete'):
        newProgramState.exerciseCompleted = true;
        newProgramState.dailyGrit = parseInt(grit);
        this.deleteUnlogged(unloggedIndex);
        this.programUpdate(day, newProgramState, grit);
        return console.log('clicked complete');

      case ('edit'):
        this.setState({ editProgram: true });
        return console.log('clicked edit');

      case ('skip'):
        newProgramState.exerciseCompleted = false;
        newProgramState.time = 0;
        newProgramState.dailyGrit = 0;
        this.deleteUnlogged(unloggedIndex);
        this.programUpdate(day, newProgramState, newProgramState.dailyGrit);
        return console.log('clicked skip');
    }
  }

  deleteUnlogged = (unloggedIndex) => {
    if (unloggedIndex > -1 ) {
      const {unloggedDays, unloggedExercises} = this.state;
      unloggedExercises.splice(unloggedIndex, unloggedIndex+1);
      unloggedDays.splice(unloggedIndex, unloggedIndex+1);
      this.setState({ unloggedExercises, unloggedDays });
    }
  }

  programUpdate = (day, newProgramState, grit) => {


    axios.patch(`/api/exerciseplans/${this.state.exerciseId}`, {[day.toLowerCase()]: newProgramState})
      // .then(res => console.log('res is', res.data))
      .then(res => this.setState({ exercises: res.data }));

    axios.post(`/api/users/${Auth.currentUserId()}/grit`, {date: this.state.momentToday, grit: grit })
      .then(res => this.setState({ userGrit: res.data.grit }));

    if (this.state.programDay.replace(' ', '') === day) {
      this.setState({ programToday: newProgramState });
    }
  }
  // this.setState({
  //   exercises: {...this.state.exercises, [day.toLowerCase()]: newProgramState }
  // }, () => {
  //   // console.log(this.state.exercises);
  //   this.child.current.parentUpdate();
  // })

  // parentUpdate = (exercises) => {
  //   this.setState({ exercises, forceUpdate: Math.random() }, () => console.log('parent state is', this.state.exercises));
  // }

  render() {
    return(
      <div className="columns">
        {this.state.exercises && this.state.goRender &&
          <Aside
            exercises = {this.state.exercises}
            exerciseId = {this.state.exerciseId}
            editProgram = {this.state.editProgram}
            programToday = {this.state.programToday}
            programDay = {this.state.programDay}
            programTomorrow = {this.state.programTomorrow}
            tomorrowRest =  {this.state.tomorrowRest}
            rest = {this.state.rest}
            unloggedExercises = {this.state.unloggedExercises}
            unloggedDays = {this.state.unloggedDays}
            parentUpdate = {this.parentUpdate}
            handleEdit = {this.handleEdit}
            handleProgramClick = {this.handleProgramClick}
            handleEditSubmit = {this.handleEditSubmit}
          />
        }
        {/* // NOTE: put conditional render here when there is no data */}
        {this.state.exercises && this.state.goRender &&
        <Feed
          exercises = {this.state.exercises}
          forceUpdate = {this.state.forceUpdate}
          userGrit = {this.state.userGrit}
          ref={this.child}
        />
        }

        {this.state.simpleDash &&
          <SimpleDash />
        }
      </div>
    );
  }
}

export default Dashboard;
