import React from 'react';
import { Link } from 'react-router-dom';

class Feed extends React.Component {
  state = {
    render: false,
    dotsArr: []
  }

  componentDidMount() {
    this.setState({ exercises: this.props.exercises }, () => {
      // console.log('feed looks like', this.state.exercises);
      this.createDots();
    });

  }

  parentUpdate = () => {
    console.log('feed called');
    this.setState({ exercises: this.props.exercises, dotsArr: [] }, () => {
      this.createDots();
    });
  }

  createDots = () => {
    for (let i = 1; i < 8; i++) {
      switch(this.props.exercises[`day${i}`].exerciseCompleted) {
        case (null):
          console.log('grey');
          this.getGrit(this.props.exercises[`day${i}`]);
          this.state.dotsArr.push({color: 'grey', grit: this.getGrit(this.props.exercises[`day${i}`]) });
          break;
        case (true):
          console.log('green');
          this.getGrit(this.props.exercises[`day${i}`]);
          this.state.dotsArr.push({color: 'green', grit: this.getGrit(this.props.exercises[`day${i}`]) });
          break;
        case (false):
          console.log('red');
          this.getGrit(this.props.exercises[`day${i}`]);
          this.state.dotsArr.push({color: 'red', grit: this.getGrit(this.props.exercises[`day${i}`]) });
          break;
      }
      if (i === 7) this.forceUpdate();
    }
  }

  getGrit = (exercise) => {
    return exercise.dailyGrit ? exercise.dailyGrit : null;
  }

  render() {
    const {dotsArr} = this.state;
    return(
      <div className="column is-10 container" style={{ height: '100vh', overflow: 'auto'}}>
        <div className="dashFeed">
          <div className="card program-card">
            <div className="card-content">
              <div className="columns is-multiline is-vcentered">
                <div className="column is-1 is-pulled-left">
                  <h3 className="title is-3"><i className="far fa-plus-square fas"></i></h3>
                </div>
                <div className="column is-pulled-left">
                  <Link className="navbar-item" to="/exerciseplan/new">
                    <h4 className="title is-4 white">Create a program</h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="card program-card-unlogged">
            <div className="card-content">
              <h4 className="title is-4 white">This week</h4>
              <div className="columns">
                { dotsArr.length === 7 && dotsArr.map((dot, i) =>
                  <div className="column is-1 has-text-centered" key={i}>
                    <i className={`title is-4 fas fa-circle dot-${dotsArr[i].color}`} key={i}></i>
                    <h5 className="subtitle is-5 white"><i className="fas fa-bolt"></i> {dotsArr[i].grit}</h5>
                  </div>
                )
                }
              </div>
              <h4 className="title is-5 white">Average workout time: {this.state.exercises && this.state.exercises.workoutTimeAvg} mins</h4>
            </div>
          </div>



        </div>
      </div>

    );
  }
}

export default Feed;
