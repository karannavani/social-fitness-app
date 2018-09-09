import React from 'react';
import axios from 'axios';
import Aside from './Aside';
import Feed from './Feed';

class Dashboard extends React.Component {
  state = {
    goRender: false
  }
  // shareExercises = (exerciseData) =>{
  //   this.setState({ exerciseData }, console.log('dash data is', exerciseData));
  // }
  componentDidMount() {
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data[0], exerciseId: res.data[0].exercisePlan[0] },
        () => this.getExercise()));
  }

  getExercise = () => { // sets the exercises from the current plan on the state
    axios.get(`/api/exerciseplans/${this.state.exerciseId}`)
      .then(res => this.setState({ exercises: res.data, goRender: true }, () => {
        console.log('exercises are', this.state.exercises);
        this.child.getExercises();
        // this.props.shareExercises(this.state.exercises);
      }
      ));
  }


  render() {
    return(
      <div className="columns">
        {this.state.exercises && this.state.goRender &&
          <Aside
            exercises = {this.state.exercises}
            exerciseId = {this.state.exerciseId}
            onRef={ref => (this.child = ref)}
            // shareExercises = {this.shareExercises}
          />
        }
        <Feed exerciseData = {this.exerciseData}/>
      </div>
    );
  }
}

export default Dashboard;
