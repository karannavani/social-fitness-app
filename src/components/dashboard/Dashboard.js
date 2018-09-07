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
    switch (id) {
      case ('complete'):
        return console.log('clicked complete');
      case ('edit'):
        return console.log('clicked edit');
      case ('skip'):
        return console.log('clicked skip');
    }
  }


  getProgram = () => {

    moment.locale('en-gb');
    // const startDate = '10/09/2018';
    const startDate = moment().add(0, 'days');
    // const today = '07/09/2018';
    const today = moment().format('L');
    console.log('start date is', startDate);

    console.log(Object.values(this.state.exercises));
    Object.values(this.state.exercises).forEach((value,i) => {
      // console.log(value);
      if (i < 7) {
        const date = moment(startDate).add(i, 'days').format('L');
        console.log('program dates are', date);

        if (date === today) {
          console.log('program for today is', value);
          this.setState({ programToday: value, programDay: `Day ${i+1}`, rest: value.rest });
        }

      }
      // console.log(Object.values(programToday));
    });
  }




  render() {
    const programToday = this.state.programToday;
    const rest = this.state.rest;

    return(
      <div className="columns">
        <div className="column is-4 " style={{ backgroundColor: '#12233e', height: '100vh', overflow: 'auto'}}>
          <div className="program-div">
            {programToday && !rest &&
              <div className="card program-card">
                <div className="card-content">
                  <h3 key="0" className="title is-3 white">{this.state.programDay}</h3>
                  <h4 className="title is-4 white">{'Today\'s Plan:'}</h4>
                  <h4 key={programToday.time} className="title is-4 white"><i className="fas fa-stopwatch"></i> {programToday.time} mins</h4>
                  <h4 key={programToday.intensity} className="title is-4 white"><i className="fas fa-fire"></i> {programToday.intensity}</h4>
                  <footer className="card-footer">
                    <a onClick={this.handleProgramClick} className="card-footer-item"><i id="complete" className="fas fa-check"></i></a>
                    <a onClick={this.handleProgramClick} className="card-footer-item"><i id="edit" className="fas fa-pencil-alt"></i></a>
                    <a onClick={this.handleProgramClick} className="card-footer-item"><i id="skip" className="fas fa-step-forward"></i></a>
                  </footer>
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
