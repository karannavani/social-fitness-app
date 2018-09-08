import React from 'react';
import axios from 'axios';

export default class ExercisePlanShow extends React.Component{
  state={};

  componentDidMount(){
    axios.get(`/api/exerciseplans/${this.props.match.params.id}`)
      .then(res => this.setState({exercisePlan: res.data}));
  }

  render(){
    const { exercisePlan } = this.state;
    return(
      <section className='container'>
        {exercisePlan &&
          //program name and tribe of creator
          //average intensity and average workout time per day
          //should include, all days laid out in similar format
          //  --lift this from dash board for consistency
          //if rest day then lift the rest day html from dashboard
          //
          <div className='columns is-centered'>
            <div className=' column is-6 columns is-multiline'>
              <div className='column is-6'>
                <h1 className='title is-5'>Plan Name</h1>
              </div>
              <div className='column is-6'>
                <h1 className='title is-5'>Tribe</h1>
              </div>
              <div className='column is-6'>
                <p><i className="fab fa-gripfire"></i>: {exercisePlan.intensityAvg}</p>
              </div>
              <div className='column is-6'>
                <p><i className="far fa-clock"></i> Average: {exercisePlan.workoutTimeAvg}</p>
              </div>

              {/* <div className='column is-12'>
                {for(let i = 1; i < 8; i++){
                  <div className="card program-card">
                    <div className="card-content">
                      <h5 key="1" className="title is-5">Day {i}:</h5>
                      <p>
                        <span
                          className="title is-5 upcomingDetails">
                          <i className="fas fa-stopwatch fas-regular"></i>
                          {exercisePlan[`day${i}`].time}
                          mins
                        </span>
                        <span
                          className="title is-5 upcomingDetails">
                          <i className="fas fa-fire fas-regular"></i> {
                            exercisePlan[`day${i}`].intensity}
                        </span>
                      </p>
                    </div>
                  </div> */}
                }}

              </div>


            </div>
          </div>
        }
      </section>
    );
  }
}
