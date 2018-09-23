import React from 'react';
import axios from 'axios';
import Aside from './Aside';
import Feed from './Feed';
import moment from 'moment';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import Request from '../../lib/Request';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }

  state = {
    goRender: false,
    unloggedExercises: [],
    unloggedDays: [],
    editProgram: false,
    feedUpdate: {},
    userChallenges: []
  }

  // Getting all the challenges
  componentDidMount() {
    this.getChallenges();
    //Getting user exercises
    axios.get(`/api/users/${Auth.currentUserId()}`, Auth.bearerHeader())
      .then(res => this.setState({ users: res.data, userGrit: res.data.grit },
        () => {
          this.getExercise();
        }));
  }


  // ************** CORE FEED FUNCTIONS ******************************

  // ************ CHALLENGES LOGIC **************

  getChallenges = () => {
    axios.get('/api/challenges', Auth.bearerHeader())
      .then(res => this.setState({ challenges: res.data },
        () => {
          console.log('challenges are', this.state.challenges);
          this.checkChallenges();
        }));
  }

  checkChallenges = () => {
    const myChallenges = this.state.userChallenges;
    this.state.challenges.forEach(challenge => {
      if (challenge.challengers.includes(Auth.currentUserId())) {
        myChallenges.push(challenge);
        this.setState({ userChallenges: myChallenges },
          () => console.log('updated user challenge is', this.state.userChallenges));
      }
    });
  }

  handleChallenge = ({target: {id}}) => {
    const [action, challengeId] = id.split(' ');

    if (action === 'complete') {
      const feedBody = {
        user: Auth.currentUserId(),
        type: 'completeChallenge',
        challengeId
      };
      Request.updateFeed(feedBody);

      axios.post(`/api/challenges/${challengeId}/completed`, { id: Auth.currentUserId()}, Auth.bearerHeader())
        .then(() => this.awardGrit(challengeId))
        .then(() => this.deleteChallenge(challengeId));

      // get grit of clicked challenge
      // add that to user grit
    } else if (action === 'skip') {
      //delete from challengers array
      this.deleteChallenge(challengeId);
    }
  }

  deleteChallenge = (challengeId) => {
    let index;
    axios.post(`/api/challenges/${challengeId}/delete`, { id: Auth.currentUserId()}, Auth.bearerHeader())
      .then(() => {
        this.state.userChallenges.map(challenge => {
          if (challenge._id === challengeId) {
            index = this.state.userChallenges.indexOf(challenge);
          }
        });
        const newState = this.state;
        newState.userChallenges.splice(index, index+1);
        this.setState({ userChallenges: newState.userChallenges});
      });
  }

  awardGrit = (challengeId) => {
    this.state.userChallenges.forEach(challenge => {
      if (challenge._id === challengeId) {
        const grit = challenge.challengeGrit;
        this.updateGrit(grit);
        Flash.setMessage('success', `Woohoo! You earned ${grit} grit`);
        console.log('path name is', this.state.history);
        this.props.history.push(this.props.location.pathname);

      }
    });
  }

  // ************ CHALLENGES LOGIC **************

  getExercise = () => { // sets the exercises from the current plan on the state
    // NOTE: this should be run conditonally if there is no execiseplan for the user
    axios.get(`/api/exerciseplans/${Auth.currentUserId()}/active`, Auth.bearerHeader())
      .then(res => this.setState({ exercises: res.data[0], goRender: true,exerciseId: res.data[0]._id }, () => {
        this.getProgram();
        // this.getProgram();
      }
      ));
  }

  getProgram = () => {
    if (this.state.exercises) {
      const { exercises: { startDate } } = this.state; // getting startDate of the exercise
      const today = moment(); //manual today for testing
      const tomorrow = moment(today).add(1, 'days');//manual tomorrowfor testing
      this.setState({ momentToday: moment(today).unix()});

      for (let i = 1; i < 8; i++) {

        // generate 7 dates from the start date – these are the program dates
        const date = moment.unix(startDate).add(i-1, 'days');

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
      // console.log('unlogged exercise is', exercise);
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
    const [id, day] = target.id.split(' ');

    if (id === 'complete') {
      this.setState({ editProgram: false });
      axios.patch(`/api/exerciseplans/${this.state.exerciseId}`,
        {[day.toLowerCase()]: this.state.programToday}, Auth.bearerHeader());

    } else if (id === 'skip') {
      this.setState({ editProgram: false });
    }
  }

  handleProgramClick = ({ target }) => { // allows user to complete, edit and skip days
    const [id, day, grit] = target.id.split(' ');
    const newProgramState = this.state.exercises[day.toLowerCase()];

    const unloggedIndex = this.state.unloggedDays.indexOf(`Day ${day.slice(3)}`);

    switch (id) {

      case ('complete'):
        newProgramState.exerciseCompleted = true;
        newProgramState.dailyGrit = parseInt(grit);
        this.deleteUnlogged(unloggedIndex);
        this.programUpdate(day, newProgramState, grit);
        this.feedUpdate(newProgramState.time, newProgramState.intensity, newProgramState.dailyGrit);
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
    axios.patch(`/api/exerciseplans/${this.state.exerciseId}`, {[day.toLowerCase()]: newProgramState}, Auth.bearerHeader())
      // .then(res => console.log('res is', res.data))
      .then(res => this.setState({ exercises: res.data }));

    this.updateGrit(grit);

    if (this.state.programDay.replace(' ', '') === day) {
      this.setState({ programToday: newProgramState });
    }
  }

  feedUpdate = (time, intensity, grit) => {
    this.setState({
      feedUpdate: {
        user: this.state.users._id,
        exercisePlanId: this.state.exerciseId,
        type: 'logWorkout',
        time,
        intensity,
        grit
      }
    }, () => {
      axios.post('/api/feed', this.state.feedUpdate, Auth.bearerHeader());
    });
  }

  updateGrit = (grit) => {
    axios.post(`/api/users/${Auth.currentUserId()}/grit`, {date: this.state.momentToday, grit: grit }, Auth.bearerHeader())
      .then(res => this.setState({ userGrit: res.data.grit }));
  }

  // ************** CORE FEED FUNCTIONS ******************************
  render() {
    return(
      <section className="container">

        <div className="columns">
          <div className="column is-3">

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

          </div>
          <div className="column is-9">

            {this.state.users && <Feed
              exercises = {this.state.exercises}
              forceUpdate = {this.state.forceUpdate}
              userGrit = {this.state.userGrit}
              ref={this.child}
              userChallenges = {this.state.userChallenges}
              user = {this.state.users}
              handleChallenge = {this.handleChallenge}
            />
            }
          </div>

        </div>
      </section>
    );
  }
}

export default Dashboard;
