import React from 'react';
import axios from 'axios';
import moment from 'moment';


class Dashboard extends React.Component {
  state = {}
  //
  componentDidMount() { // sets all films onto the state
    axios.get('/api/users/')
      .then(res => this.setState({ users: res.data[0], exerciseId: res.data[0].exercisePlan[0] }, () => this.getExercise()));
  }

  getExercise = () => {
    axios.get(`/api/exerciseplans/${this.state.exerciseId}`)
      .then(res => this.setState({ exercises: res.data }, () => {
        console.log('exercises are', this.state.exercises);
        this.getProgram();
      }
      ));
  }

  handleProgramClick = ({target: {id} }) => {
    console.log(id);
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
        return console.log('clicked edit');
      case ('skip'):
        return console.log('clicked skip');
    }
  }


  getProgram = () => {

    moment.locale('en-gb');

    const startDate = this.state.exercises.startDate;

    const today = moment().unix();
    const tomorrow = moment(today).add(1, 'days');
    // console.log('start date is', startDate);

    for (let i = 1; i < 8; i++) {

      const date = moment(startDate).add(i-1, 'days');
      // console.log('prog date is', date);
      if (moment.unix(date).format('DD/MM/YYYY') === moment.unix(today).format('DD/MM/YYYY')) {
        console.log(moment.unix(date).format('DD/MM/YYYY'));
        console.log('today is found');
        const value = this.state.exercises[`day${i}`];
        console.log('program for today is', value);
        this.setState({ programToday: value, programDay: `Day ${i-1}`, rest: value.rest });

      } else if (moment.unix(date).format('DD/MM/YYYY') === moment.unix(tomorrow).format('DD/MM/YYYY') ) {
        const value = this.state.exercises[`day${i}`];
        this.setState({ programTomorrow: value, programDay: `Day ${i-1}`, tomorrowRest: value.rest });
      }

    }

  }




  render() {
    const programToday = this.state.programToday;
    const programTomorrow = this.state.programTomorrow;
    const rest = this.state.rest;
    const tomorrowRest = this.state.tomorrowRest;
    console.log('rest is', rest);

    return(
      <div className="columns">
        <div className="column is-4 " style={{ backgroundColor: '#12233e', height: '100vh', overflow: 'auto'}}>
          <div className="program-div">
            {programToday && !rest && !this.state.programToday.exerciseCompleted &&
              <div className="card program-card">
                <div className="card-content">
                  <h3 key="0" className="title is-3 white">{this.state.programDay}</h3>
                  <h4 className="title is-4 white">{'Today\'s Plan:'}</h4>
                  <h4 key={programToday.time} className="title is-4 white"><i className="fas fa-stopwatch"></i> {programToday.time} mins</h4>
                  <h4 key={programToday.intensity} className="title is-4 white"><i className="fas fa-fire"></i> {programToday.intensity}</h4>
                  <footer className="card-footer">
                    <a onClick={this.handleProgramClick} className="card-footer-item"><i id="complete" className="fas fa-check"></i></a>
                    <a onClick={this.handleProgramClick} className="card-footer-item"><i id="edit" className="fas fa-pencil-alt"></i></a>
                    <a onClick={this.handleProgramClick} className="card-footer-item"><i id="skip" className="fas fa-times"></i></a>
                  </footer>
                </div>
              </div>
            }



            {programToday && this.state.programToday.exerciseCompleted && programTomorrow && tomorrowRest &&
                <div>
                  <div className="card program-card-completed">
                    <div className="card-content">
                      <h4 key="0" className="title is-4">{this.state.programDay} - Nailed it</h4>
                    </div>
                  </div>
                  <div className="card program-card">
                    <div className="card-content">
                      <h5 key="0" className="title is-5">Upcoming tomorrow:</h5>
                      <h5 key="1" className="title is-5">Well deserved rest</h5>
                    </div>
                  </div>
                </div>
            }

            {programToday && !rest && this.state.programToday.exerciseCompleted && programTomorrow && !tomorrowRest &&
              <div>
                <div className="card program-card-completed">
                  <div className="card-content">
                    <h4 key="0" className="title is-4">{this.state.programDay} - Nailed it</h4>
                  </div>
                </div>
                <div className="card program-card">
                  <div className="card-content">
                    <h5 key="1" className="title is-5">Upcoming tomorrow:</h5>
                    <p>
                      <span className="title is-5 upcomingDetails"><i className="fas fa-stopwatch fas-regular"></i> {programTomorrow.time} mins</span>
                      <span className="title is-5 upcomingDetails"><i className="fas fa-fire fas-regular"></i> {programTomorrow.intensity}</span>
                    </p>
                  </div>
                </div>
              </div>
            }





            {programToday && rest && programTomorrow &&
              <div>
                <div className="card program-card-rest">
                  <div className="card-content">
                    <h3 key="0" className="title is-3 white">{this.state.programDay}</h3>
                    <h4 className="subtitle is-4 white">{'It\'s your rest day, take it easy!'}</h4>
                  </div>
                </div>
                <div className="card program-card">
                  <div className="card-content">
                    <h5 key="0" className="title is-5">Upcoming tomorrow:</h5>
                    <p>
                      <span className="title is-5 upcomingDetails"><i className="fas fa-stopwatch fas-regular"></i> {programTomorrow.time} mins</span>
                      <span className="title is-5 upcomingDetails"><i className="fas fa-fire fas-regular"></i> {programTomorrow.intensity}</span>
                    </p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="column is-10" style={{ backgroundColor: '#F5F5F5', height: '100vh', overflow: 'auto'}}>

        </div>
      </div>
    );
  }
}

export default Dashboard;
