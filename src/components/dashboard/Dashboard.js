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
      const date = moment(startDate).add(i, 'days').format('L');
      console.log('program dates are', date);

      if (date === today) {
        console.log('program for today is', value);
        this.setState({ programToday: value });
      }
    });
  }




  render() {
    const programToday = this.state.programToday;
    return(
      <div className="columns">
        <div className="column is-3" style={{ backgroundColor: '#12233e', height: '100vh', overflow: 'auto'}}>
          <h3 className="title is-3 white">{'Today\'s Plan'}</h3>
          {programToday && Object.keys(programToday).map(field =>
            <h4 key={field} className="title is-4 white">{field} – {programToday[field]}</h4>)
          }
        </div>
        <div className="column is-9" style={{ backgroundColor: '#F5F5F5', height: '100vh', overflow: 'auto'}}>

        </div>
      </div>
    );
  }
}

export default Dashboard;
