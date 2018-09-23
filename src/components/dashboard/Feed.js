import React from 'react';
import NewsFeed from './NewsFeed';
// import axios from 'axios';

class Feed extends React.Component {
  state = {
    render: false,
    dotsArr: [],
    timeArr: []
  }

  componentDidMount() {

    this.setState({ exercises: this.props.exercises, dotsArr: [] }, () => {
      if (this.props.exercises) this.createDots();
    });

  }

  componentDidUpdate(prevProps) {
    if (prevProps.exercises !== this.props.exercises) {
      this.setState({ exercises: this.props.exercises, dotsArr: [] }, () => {
        if (this.props.exercises) this.createDots();
      });
    }
  }

  createDots = () => {
    const timeArr = [];
    for (let i = 1; i < 8; i++) {
      if(this.state.exercises.day1.exerciseCompleted || !this.state.exercises.day1.exerciseCompleted  ){
        switch(this.state.exercises[`day${i}`].exerciseCompleted) {
          case (null):
            this.getGrit(this.props.exercises[`day${i}`]);
            this.state.dotsArr.push({color: 'grey', grit: this.getGrit(this.props.exercises[`day${i}`]) });
            break;

          case (true):
            this.getGrit(this.props.exercises[`day${i}`]);
            if (this.props.exercises[`day${i}`].rest === true) {
              this.state.dotsArr.push({color: 'orange', grit: this.getGrit(this.props.exercises[`day${i}`]) });

            } else {
              timeArr.push(this.getCompletedTime(this.props.exercises[`day${i}`]));
              this.state.dotsArr.push({color: 'green', grit: this.getGrit(this.props.exercises[`day${i}`]) });
            }
            // timeArr.push(this.getCompletedTime(this.props.exercises[`day${i}`]));
            // this.state.dotsArr.push({color: 'green', grit: this.getGrit(this.props.exercises[`day${i}`]) });
            break;

          case (false):
            this.getGrit(this.props.exercises[`day${i}`]);
            this.state.dotsArr.push({color: 'red', grit: this.getGrit(this.props.exercises[`day${i}`]) });
            break;
        }
      }
      if (i === 7) {
        this.setState({ timeArr: this.reduceTimeArr(timeArr) });
      }

    }
  }

  getGrit = (exercise) => {
    return exercise.dailyGrit ? exercise.dailyGrit : null;
  }

  getCompletedTime = (exercise) => {
    return !exercise.rest ? exercise.time : 0;
  }

  reduceTimeArr = (timeArr) => {
    return timeArr.reduce((sum, time) =>{
      return sum + time;
    }, 0);
  }

  render() {
    const {dotsArr} = this.state;
    return(
      <div style={{ height: '100vh', overflowY: 'auto'}}>
        <div className="dashFeed">
          <div style={{marginBottom: '15px' }}>
            <h3 className="page-title-small">Your Grit: <i className="fas fa-bolt" style={{color: '#eaeaed'}}></i> {this.props.userGrit}</h3>
          </div>

          {this.props.userChallenges.length > 0 &&
            <div className="card feed-top-options">
              <div className="card-content">
                <div className="columns is-multiline is-vcentered">
                  <div className="column is-1 is-pulled-left">
                    <h3 className="title is-3"><i className="far fa-plus-square fas"></i></h3>
                  </div>
                  <div className="column is-pulled-left">
                    <h4 className="title is-4 white">Current challenges:</h4>
                    {this.props.userChallenges.map(challenge =>
                      <p key={challenge._id}><span className="title is-5">{challenge.name}
                        <i className="fas fa-check" style={{ marginLeft: '15px' }} id={`complete ${challenge._id}`} onClick={this.props.handleChallenge}></i>
                        <i className="fas fa-times" style={{ marginLeft: '15px' }} id={`skip ${challenge._id}`} onClick={this.props.handleChallenge}></i></span></p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          }

          {this.props.exercises &&
          <div className="card card-unlogged">
            <div className="card-content">
              <div className="columns">
                { dotsArr.length === 7 && dotsArr.map((dot, i) =>
                  <div className="column has-text-centered" key={i}>
                    <i className={`animated swing title is-4 fas fa-circle dot-${dotsArr[i].color}`} key={i}></i>
                    <h5 className="subtitle is-5 white animated swing"><i className="fas fa-bolt animated swing"></i> <span style={{ color: 'white' }}>{dotsArr[i].grit}</span></h5>
                  </div>
                )}
              </div>
              <div className="columns">
                <div className="column has-text-centered">
                  <p className="feed-animations-text">Total work out time: {this.state.timeArr && this.state.timeArr} mins</p>
                </div>
                <div className="column is-pulled-right has-text-centered">
                  <p>Predicted daily average: {this.state.exercises && this.state.exercises.workoutTimeAvg} mins</p>
                </div>
              </div>
            </div>
          </div>
          }

          <section className='container'>
            <NewsFeed />
          </section>


        </div>
      </div>

    );
  }
}

export default Feed;
