import React from 'react';
import axios from 'axios';

//dependancies
import moment from 'moment';
import Auth from '../../lib/Auth';

//components
import UpcomingCard from '../common/cards/UpcomingCard';
import RestCard from '../common/cards/RestCard';
import FormInput from '../common/FormInput';

export default class ExercisePlanShow extends React.Component{
  state={
    adopting: false
  };

  componentDidMount(){
    axios.get(`/api/exerciseplans/${this.props.match.params.id}`)
      .then(res => this.setState(res.data));
  }

  componentDidUpdate(prevProps, prevState){
    console.log('previous state is', prevState);
    console.log('state is', this.state);
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({[name]: value});
  };

  handleAdoption = () => {
    if(!this.state.adopting){
      const adopting = true;
      this.setState({ adopting });
    }else if(this.state.adopting){
      const adoptedPlan = this.packageAdoptionData();
      axios.post('/api/exerciseplans', adoptedPlan)
        .then(() => this.props.history.push('/dashboard'))
        .catch(err => console.log('adoption error message: ', err));
    }
  }

  // NOTE: this needs refactoring
  packageAdoptionData = () =>{
    const unixStartDate = moment(this.state.newStartDate).unix();
    let exercisePlanAdoptedFrom = this.state.exercisePlanAdoptedFrom;
    if(!this.state.exercisePlanAdoptedFrom){
      exercisePlanAdoptedFrom = this.state.id;
    }

    const packagedData = {
      day1: {
        rest: this.state.day1.rest,
        time: this.state.day1.time,
        intensity: this.state.day1.intensity
      },
      day2: {
        rest: this.state.day2.rest,
        time: this.state.day2.time,
        intensity: this.state.day2.intensity
      },
      day3: {
        rest: this.state.day3.rest,
        time: this.state.day3.time,
        intensity: this.state.day3.intensity
      },
      day4: {
        rest: this.state.day4.rest,
        time: this.state.day4.time,
        intensity: this.state.day4.intensity
      },
      day5: {
        rest: this.state.day5.rest,
        time: this.state.day5.time,
        intensity: this.state.day5.intensity
      },
      day6: {
        rest: this.state.day6.rest,
        time: this.state.day6.time,
        intensity: this.state.day6.intensity
      },
      day7: {
        rest: this.state.day7.rest,
        time: this.state.day7.time,
        intensity: this.state.day7.intensity
      },
      user: Auth.currentUserId(),
      startDate: unixStartDate,
      exercisePlanAdoptedFrom: exercisePlanAdoptedFrom
    };

    return packagedData;
  }

  render(){
    const { state } = this;
    return(
      <section className='container'>
        {state &&
          <div className='columns is-centered'>
            <div className=' column is-8 columns is-mobile is-multiline'>
              <div className='column is-6'>
                <h1 className='title is-5'>Plan Name</h1>
              </div>
              <div className='column is-6'>
                <h1 className='title is-5'>Tribe</h1>
              </div>
              <div className='column is-6'>
                <p><i className="fas fa-fire fas-regular"></i>: {state.intensityAvg}</p>
              </div>
              <div className='column is-6'>
                <p><i className="fas fa-stopwatch fas-regular"></i> Average: {state.workoutTimeAvg}</p>
              </div>

              {/* day cards */}
              <div className='column is-12'>
                {Object.keys(state).map(key => {
                  if(!state[key].rest && state[key].intensity){
                    return <UpcomingCard key={key} title={key} programDetails={state[key]} />;

                  }else if(state[key].rest){
                    return  <RestCard key={key} programDay={key} title='Rest Day' />;
                  }
                })
                }
              </div>

              <div className='column is-12 has-text-centered'>
                {!this.state.adopting ?
                  <button onClick={this.handleAdoption} className='button is-primary'>Want to Adopt?</button>
                  :
                  <div>
                    <FormInput
                      name='newStartDate'
                      type='date'
                      handleChange={this.handleChange}
                      state={this.state}
                      label='Choose your preferred start date'
                    />
                    <button onClick={this.handleAdoption} className='button is-primary'>Adopt</button>
                  </div>
                }

              </div>

            </div>
          </div>
        }
      </section>
    );
  }
}
