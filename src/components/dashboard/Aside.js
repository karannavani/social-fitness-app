import React from 'react';

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
    unloggedExercises: [],
    unloggedDays: []
  }

  componentDidMount() {
    this.setState({ exercises: this.props.exercises }, () => {
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.exercises !== this.props.exercises) {
      this.setState({ exercises: this.props.exercises });
    }
  }

  render() {
    const {programToday, programDay, programTomorrow,
      rest, tomorrowRest, unloggedExercises, unloggedDays } = this.props;
    const {exerciseCompleted, dailyGrit} = this.props.programToday || [];
    const {editProgram} = this.props;
    return(

      <div className="aside">
        <div className="program-div">
          {programToday && <h2 className="page-title-small">Today</h2>}
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
          <h3 className="page-title-small">Unlogged</h3>}
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
