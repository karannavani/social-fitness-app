import React from 'react';
import axios from 'axios';
import moment from 'moment';

//Components
import TodayCard from '../common/cards/TodayCard';
import UnloggedCard from '../common/cards/UnloggedCard';
import GreenCard from '../common/cards/GreenCard';
import RedCard from '../common/cards/RedCard';
import RestCard from '../common/cards/RestCard';
import UpcomingCard from '../common/cards/UpcomingCard';
import UpcomingRestCard from '../common/cards/UpcomingRestCard';


class Aside extends React.Component {
  state = {
    editProgram: false, // this is linked to the edit button on the exercise card
    unloggedExercises: [],
    unloggedDays: []
  }
  //
  componentDidMount() {
    axios.get('/api/users/')
      .then(res => this.setState({ users: res.data[0], exerciseId: res.data[0].exercisePlan[0] },
        () => this.getExercise()));
  }

  getExercise = () => { // sets the exercises from the current plan on the state
    axios.get(`/api/exerciseplans/${this.state.exerciseId}`)
      .then(res => this.setState({ exercises: res.data }, () => {
        console.log('exercises are', this.state.exercises);
        this.getProgram();
      }
      ));
  }

  handleEdit = ({ target: { name, value } }) => { // handles exercise edit for that day
    const newState = this.state.programToday;
    newState[name] = value;
    this.setState({programToday: newState});
  }

  handleEditSubmit = ({target: {id}}) => { // saves the edit to the exercise db or cancels it

    if (id === 'complete') {
      this.setState({ editProgram: false });
      axios.patch(`/api/exerciseplans/${this.state.exerciseId}`, {day1: this.state.programToday});
    } else if (id === 'skip') {
      this.setState({ editProgram: false });
    }
  }

  handleProgramClick = ({target: {id} }) => { // allows user to complete, edit and skip days
    const newProgramState = this.state.programToday;
    switch (id) {

      case ('complete'):
        newProgramState.exerciseCompleted = true;
        this.setState({programToday: newProgramState}, () => {
          console.log('updated program is', this.state.programToday);
        });
        axios.patch(`/api/exerciseplans/${this.state.exerciseId}`, {day1: this.state.programToday});
        return console.log('clicked complete');

      case ('edit'):
        this.setState({ editProgram: true });
        return console.log('clicked edit');

      case ('skip'):
        newProgramState.exerciseCompleted = false;
        this.setState({programToday: newProgramState}, () => {
          console.log('updated program is', this.state.programToday);
        });
        axios.patch(`/api/exerciseplans/${this.state.exerciseId}`, {day1: this.state.programToday});
        return console.log('clicked skip');
    }
  }

  getProgram = () => {

    const { exercises: { startDate } } = this.state; // getting startDate of the exercise
    // const today = moment.utc();
    // const tomorrow = moment.utc().add(1, 'days');
    const today = moment.utc().add(3, 'days'); //manual today for testing
    const tomorrow = moment.utc(today).add(1, 'days');//manual tomorrowfor testing

    for (let i = 1; i < 8; i++) {

      // generate 7 dates from the start date – these are the program dates
      const date = moment.utc(moment.unix(startDate)).add(i-1, 'days');
      console.log('date is', date.format('DD/MM/YYYY'));

      // if a program date matches today's date, get the program at that index and set it as today's program
      if (date.format('DD/MM/YYYY') === today.format('DD/MM/YYYY')) {
        const value = this.state.exercises[`day${i}`];
        console.log('program for today is', value);
        this.setState({ programToday: value, programDay: `Day ${i}`, rest: value.rest });

        // saving the workout of the next day to the state
      } else if (date.format('DD/MM/YYYY') === tomorrow.format('DD/MM/YYYY') ) {
        const value = this.state.exercises[`day${i}`];
        this.setState({ programTomorrow: value, tomorrowRest: value.rest });

      } else if(moment(date).isBefore(moment(today))) {

        console.log(`${date.format('DD/MM/YYYY')} is before ${today.format('DD/MM/YYYY')}`);
        this.checkUnlogged(this.state.exercises[`day${i}`], `Day ${i}`);
      }
    }

  }

  checkUnlogged = (exercise, i) => {
    if (exercise.exerciseCompleted === null) {
      console.log('unlogged exercise is', exercise);
      console.log(i);
      this.state.unloggedDays.push(i);
      this.state.unloggedExercises.push(exercise);
      console.log(this.state.unloggedExercises);
    }

  }

  render() {
    const {programToday, programDay, programTomorrow, editProgram,
      rest, tomorrowRest, unloggedExercises, unloggedDays } = this.state;
    const {exerciseCompleted} = this.state.programToday || [];

    return(

      <div className="column is-4 dashAside">
        <div className="program-div">
          {programToday && <h2 className="title is-2 white">Today:</h2>}
          {/* **************CARDS LOGIC************** */}

          {/* main card which displays today's exercise */}
          {programToday && !rest && exerciseCompleted === null &&
            <TodayCard
              editProgram = {editProgram}
              programDay = {programDay}
              programToday = {programToday}
              handleEdit = {this.handleEdit}
              handleEditSubmit = {this.handleEditSubmit}
              handleProgramClick = {this.handleProgramClick}
            />
          }

          {/* collapses the card when exercise is completed or skipped*/}
          {programToday && !rest &&
            <div>
              {exerciseCompleted &&
                <GreenCard programDay = {this.state.programDay} />
              }
              {exerciseCompleted === false &&
                <RedCard programDay = {this.state.programDay} />
              }
            </div>
          }

          {/* primary card for rest day*/}
          {programToday && exerciseCompleted && rest &&
            <RestCard
              programDay = {this.state.programDay}
              title = {'It\'s your rest day, take it easy!'}
            />
          }

          {/* upcoming cards for rest day and non rest day*/}
          {programToday && exerciseCompleted !== null && programTomorrow &&
            <div>
              { tomorrowRest &&
                <UpcomingRestCard
                  title = {'Upcoming tomorrow:'}
                />
              }
              {!tomorrowRest &&
                <UpcomingCard
                  programDetails = {this.state.programTomorrow}
                  title = {'Upcoming tomorrow:'}/>
              }
            </div>
          }

          {unloggedExercises.length > 0 &&
          <h3 className="title is-3 white">Unlogged:</h3>}
          {unloggedExercises.length > 0 && unloggedExercises.map((exercise, i) =>
            <div key = {i}>
              <UnloggedCard
                editProgram = {editProgram}
                programDay = {unloggedDays[i]}
                program = {exercise}
                handleEdit = {this.handleEdit}
                handleEditSubmit = {this.handleEditSubmit}
                handleProgramClick = {this.handleProgramClick}
              />
            </div>
          )
          }

          {/* **************CARDS LOGIC************** */}
          {/* **************TIMELINE LOGIC************** */}
          <div>
            {/* {this.state.exercises && this.state.exercises.map(field => console.log(field)) } */}

            {/* {this.state.exercises && Object.keys(this.state.exercises).map((key, i) =>
              <p key={key}>{this.state.exercises[`day${i}`].time}</p>)} */}
          </div>
          {/* **************TIMELINE LOGIC************** */}


        </div>
      </div>

    );
  }
}

export default Aside;
