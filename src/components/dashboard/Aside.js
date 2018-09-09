import React from 'react';
import axios from 'axios';

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
    // editProgram: false, // this is linked to the edit button on the exercise card
    unloggedExercises: [],
    unloggedDays: []
  }
  //
  // componentDidMount() {
  //   this.props.onRef(this);
  // }
  //
  // getParentData = () => {
  //   this.setState({
  //     exercises: this.props.exercises
  //   }, console.log('aside state looks like', this.state));
  // }
  //
  // handleEdit = ({ target: { name, value } }) => { // handles exercise edit for that day
  //   const newState = this.props.programToday;
  //   newState[name] = value;
  //   this.setState({programToday: newState});
  // }
  //
  // handleEditSubmit = ({ target }) => { // saves the edit to the exercise db or cancels it
  //   console.log('target is', target.id);
  //   const [id, day] = target.id.split(' ');
  //   console.log('day is', day);
  //   if (id === 'complete') {
  //     this.setState({ editProgram: false });
  //     axios.patch(`/api/exerciseplans/${this.props.exerciseId}`,
  //       {[day.toLowerCase()]: this.props.programToday});
  //
  //   } else if (id === 'skip') {
  //     this.setState({ editProgram: false });
  //   }
  // }
  //
  // handleProgramClick = ({ target }) => { // allows user to complete, edit and skip days
  //   console.log('target is', target.id);
  //   const [id, day, grit] = target.id.split(' ');
  //   console.log('day is ====>', day);
  //   // console.log('grit is ====>', grit);
  //   const newProgramState = this.props.exercises[day.toLowerCase()];
  //   const unloggedIndex = this.props.unloggedDays.indexOf(`Day ${day.slice(3)}`);
  //
  //   switch (id) {
  //
  //     case ('complete'):
  //       newProgramState.exerciseCompleted = true;
  //       newProgramState.dailyGrit = parseInt(grit);
  //       this.deleteUnlogged(unloggedIndex);
  //       this.programUpdate(day, newProgramState);
  //       return console.log('clicked complete');
  //
  //     case ('edit'):
  //       this.setState({ editProgram: true });
  //       return console.log('clicked edit');
  //
  //     case ('skip'):
  //       newProgramState.exerciseCompleted = false;
  //       this.deleteUnlogged(unloggedIndex);
  //       this.programUpdate(day, newProgramState);
  //       return console.log('clicked skip');
  //   }
  // }
  //
  //
  // deleteUnlogged = (unloggedIndex) => {
  //   if (unloggedIndex > -1 ) {
  //     const {unloggedDays, unloggedExercises} = this.props;
  //     unloggedExercises.splice(unloggedIndex, unloggedIndex+1);
  //     unloggedDays.splice(unloggedIndex, unloggedIndex+1);
  //     this.setState({ unloggedExercises, unloggedDays });
  //   }
  // }
  //
  // programUpdate = (day, newProgramState) => {
  //   axios.patch(`/api/exerciseplans/${this.props.exerciseId}`, {[day.toLowerCase()]: newProgramState});
  //
  //   this.setState({
  //     exercises: {...this.props.exercises, [day.toLowerCase()]: newProgramState }
  //   }, () => {
  //     console.log(this.props.exercises);
  //     this.props.parentUpdate(this.state.exercises);
  //   });
  //
  // }
  //

  render() {
    const {programToday, programDay, programTomorrow,
      rest, tomorrowRest, unloggedExercises, unloggedDays } = this.props;
    const {exerciseCompleted, dailyGrit} = this.props.programToday || [];
    const {editProgram} = this.props;
    return(

      <div className="column is-4 is-3-desktop dashAside">
        <div className="program-div">
          {programToday && <h2 className="title is-2 white">Today</h2>}
          {/* **************CARDS LOGIC************** */}

          {/* main card which displays today's exercise */}
          {programToday && !rest && exerciseCompleted === null &&
            <TodayCard
              editProgram = {editProgram}
              programDay = {programDay}
              programToday = {programToday}
              handleEdit = {this.props.handleEdit}
              handleEditSubmit = {this.props.handleEditSubmit}
              handleProgramClick = {this.props.handleProgramClick}
            />
          }

          {/* collapses the card when exercise is completed or skipped*/}
          {programToday && !rest &&
            <div>
              {exerciseCompleted &&
                <GreenCard
                  programDay = {this.props.programDay}
                  grit = {dailyGrit}
                />
              }
              {exerciseCompleted === false &&
                <RedCard programDay = {this.props.programDay} />
              }
            </div>
          }

          {/* primary card for rest day*/}
          {programToday && exerciseCompleted && rest &&
            <RestCard
              programDay = {this.props.programDay}
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
                  programDetails = {this.props.programTomorrow}
                  title = {'Upcoming tomorrow:'}/>
              }
            </div>
          }

          {unloggedExercises.length > 0 &&
          <h3 className="title is-3 white">Unlogged</h3>}
          {unloggedExercises.length > 0 && unloggedExercises.map((exercise, i) =>
            <div key = {i}>
              <UnloggedCard
                editProgram = {editProgram}
                programDay = {unloggedDays[i]}
                program = {exercise}
                handleEdit = {this.props.handleEdit}
                handleEditSubmit = {this.props.handleEditSubmit}
                handleProgramClick = {this.props.handleProgramClick}
              />
            </div>
          )
          }

          {/* **************CARDS LOGIC************** */}


        </div>
      </div>

    );
  }
}

export default Aside;
