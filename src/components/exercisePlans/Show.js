// EXERCISE SHOW
import React from 'react';

//dependancies
import axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

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

  // componentDidUpdate(prevProps, prevState){
  //   console.log('previous state is', prevState);
  //   console.log('state is', this.state);
  // }

  handleChange = ({ target: { name, value }}) => {
    this.setState({[name]: value});
  };

  handleAdoption = () => {
    if(!this.state.adopting){
      this.getUsersCurrentPlan();
      const adopting = true;
      this.setState({ adopting });

    }else if(this.state.adopting){

      if(this.validateStartDate()){
        const formattedDate = moment.unix(this.state.startDate).format('dddd, MMMM Do YYYY');
        this.createAdoptedPlan();
        Flash.setMessage('success', `Successfully adopted a plan. It will start on the ${formattedDate}`);
      }else{
        const sevenDaysTime = moment.utc(moment.unix(this.state.startDate)).add(7, 'days');
        const formattedDate = moment(sevenDaysTime).format('dddd, MMMM Do YYYY');
        Flash.setMessage('danger', `You must choose a start date that starts after your current plan ends on ${formattedDate}`);
        this.props.history.push(this.props.location.path);
      }
    }
  }

  validateStartDate = () => {
    // console.log('from state ', this.state.newStartDate);
    const momStartDate = moment(this.state.newStartDate).utc();
    // console.log('the newStartDate is:', momStartDate);
    const sevenDaysTime = moment.utc(moment.unix(this.state.usersActivePlanStartDate)).add(6, 'days');
    // console.log('the date sevenDaysTime is: ', sevenDaysTime);
    if(moment(momStartDate).isAfter(sevenDaysTime)) return true;

    return false;
  }

  //gets the users most recent program and sets the start date to state
  getUsersCurrentPlan = () =>{
    const paginateOptions = {
      'userId': Auth.currentUserId(),
      'page': 1,
      'sort': { 'startDate': -1 },
      'limit': 1
    };
    axios.post('/api/exerciseplans/paginate', paginateOptions)
      .then(res => this.setState({usersActivePlanStartDate: res.data.docs[0].startDate}));
  }

  createAdoptedPlan = () => {
    const adoptedPlan = this.packageAdoptionData();
    axios.post('/api/exerciseplans', adoptedPlan)
      .then(() => this.props.history.push('/dashboard'))
      .catch(err => console.log('adoption error message: ', err));

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

  //start date can only be after current program completes
  //validte date input

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
                {/* // BUG: Day number is unreliable  */}
                {Object.keys(state).map((key, i) => {
                  if(!state[key].rest && state[key].intensity){
                    return <UpcomingCard key={key} title={`Day ${i}`} programDetails={state[key]} />;

                  }else if(state[key].rest){
                    return  <RestCard key={key} programDay={`Day ${i}`} title='Rest Day' />;
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
