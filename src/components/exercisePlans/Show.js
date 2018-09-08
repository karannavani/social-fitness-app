import React from 'react';
import axios from 'axios';

//components
import UpcomingCard from '../common/cards/UpcomingCard';
import RestCard from '../common/cards/RestCard';

export default class ExercisePlanShow extends React.Component{
  state={};

  componentDidMount(){
    axios.get(`/api/exerciseplans/${this.props.match.params.id}`)
      .then(res => this.setState({exercisePlan: res.data}));
  }

  handleAdoption = () => {
    
  }

  render(){
    const { exercisePlan } = this.state;
    return(
      <section className='container'>
        {exercisePlan &&
          <div className='columns is-centered'>
            <div className=' column is-8 columns is-mobile is-multiline'>
              <div className='column is-6'>
                <h1 className='title is-5'>Plan Name</h1>
              </div>
              <div className='column is-6'>
                <h1 className='title is-5'>Tribe</h1>
              </div>
              <div className='column is-6'>
                <p><i className="fas fa-fire fas-regular"></i>: {exercisePlan.intensityAvg}</p>
              </div>
              <div className='column is-6'>
                <p><i className="fas fa-stopwatch fas-regular"></i> Average: {exercisePlan.workoutTimeAvg}</p>
              </div>

              {/* day cards */}
              <div className='column is-12'>
                {Object.keys(exercisePlan).map(key => {
                  if(!exercisePlan[key].rest && exercisePlan[key].intensity){
                    return <UpcomingCard key={key} title={key} programDetails={exercisePlan[key]} />;

                  }else if(exercisePlan[key].rest){
                    return  <RestCard key={key} programDay={key} title='Rest Day' />;
                  }
                })
                }
              </div>

              <div className='column is-12 has-text-centered'>
                <button onClick={this.handleAdoption} className='button is-primary'>Adopt</button>
              </div>

            </div>
          </div>
        }
      </section>
    );
  }
}
