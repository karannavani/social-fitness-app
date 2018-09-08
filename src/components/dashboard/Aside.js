import React from 'react';
import axios from 'axios';
import moment from 'moment';

//Components
import TodayCard from '../common/cards/TodayCard';
import GreenCard from '../common/cards/GreenCard';
import RedCard from '../common/cards/RedCard';
import RestCard from '../common/cards/RestCard';
import UpcomingCard from '../common/cards/UpcomingCard';
import UpcomingRestCard from '../common/cards/UpcomingRestCard';


class Aside extends React.Component {
  state = {
    editProgram: false // this is linked to the edit button on the exercise card
  }
  //
  componentDidMount() {
    axios.get('/api/users/')
      .then(res => this.setState({ users: res.data[0], exerciseId: res.data[0].exercisePlan[0] }, () => this.getExercise()));
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

    // const { exercises: { startDate } } = this.state; // getting startDate of the exercise
    // const { exercises: { startDate } } = this.state; // getting startDate of the exercise

    const today = moment.utc();
    const tomorrow = moment.utc().add(1, 'days');

    for (let i = 1; i < 8; i++) {

      // generate 7 dates from the start date – these are the program dates

      const date = moment.utc().add(i-1, 'days');
      console.log('date is', date.format('DD/MM/YYYY'));

      if(moment(date).isBefore(moment(today))) {
        this.checkUnlogged(this.state.exercises[`day${i}`]);

        // if a program date matches today's date, get the program at that index and set it as today's program
      } else if (date.format('DD/MM/YYYY') === today.format('DD/MM/YYYY')) {
        const value = this.state.exercises[`day${i}`];
        console.log('program for today is', value);
        this.setState({ programToday: value, programDay: `Day ${i}`, rest: value.rest });

      // saving the workout of the next day to the state
      } else if (date.format('DD/MM/YYYY') === tomorrow.format('DD/MM/YYYY') ) {
        const value = this.state.exercises[`day${i}`];
        this.setState({ programTomorrow: value, tomorrowRest: value.rest });
      }

    }

  }

  checkUnlogged = (today) => {
    console.log('unlogged today is', today);

  }

  render() {
    const {programToday, programDay, programTomorrow, editProgram, rest, tomorrowRest } = this.state;
    const {exerciseCompleted} = this.state.programToday || [];

    return(

      <div className="column is-4 " style={{ backgroundColor: '#12233e', height: '100vh', overflow: 'auto'}}>
        <div className="program-div">

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
