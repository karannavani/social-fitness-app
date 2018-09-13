// EXERCISE SHOW
import React from 'react';

//dependancies
import axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';
import Validate from '../../lib/Validate';
import Flash from '../../lib/Flash';
import Request from '../../lib/Request';
import Id from '../../lib/Id';

//components
import UpcomingCard from '../common/cards/UpcomingCard';
import RestCard from '../common/cards/RestCard';
import FormInput from '../common/FormInput';

export default class ExercisePlanShow extends React.Component{
  state={
    adopting: false
  };

  componentDidMount(){
    const newExercisePlanId = Id.create();
    this.setState({newExercisePlanId});

    axios.get(`/api/exerciseplans/${this.props.match.params.id}`, Auth.bearerHeader())
      .then(res => this.setState(res.data, () => console.log('the exercise data is: ', this.state)));
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({[name]: value});
  };

  handleAdoption = () => {
    if(!this.state.adopting){
      this.getUsersCurrentPlan();
      const adopting = true;
      this.setState({ adopting });

    }else if(this.state.adopting){

      // if(this.VstartDate(Auth.currentUserId(), this.state.newStartDate, this.state.usersActivePlanStartDate, this.state.futurePlans)){
      if(Validate.startDate(this.state.newStartDate, this.state.usersActivePlanStartDate, this.state.futurePlans )){
        const formattedDate = moment(this.state.newStartDate).format('dddd, MMMM Do YYYY');
        this.createAdoptedPlan();
        Flash.setMessage('success', `Successfully adopted a plan. It will start on the ${formattedDate}`);
      }else{
        const sevenDaysTime = moment.unix(this.state.usersActivePlanStartDate).add(7, 'days');
        const formattedDate = moment(sevenDaysTime).format('dddd, MMMM Do YYYY');
        Flash.setMessage('danger', `You must choose a start date that starts after your current plan ends on ${formattedDate}`);
        this.props.history.push(this.props.location.path);
      }
    }
  }

  // Gets the users most recent program and sets the start date to state
  getUsersCurrentPlan = () =>{
    axios.get(`/api/exerciseplans/${Auth.currentUserId()}/active`, Auth.bearerHeader())
      .then(res => {
        this.setState({usersActivePlanStartDate: res.data}, () => {
          if (this.state.usersActivePlanStartDate.length) {
            this.setState({usersActivePlanStartDate: res.data[0].startDate});
          }else{
            this.setState({usersActivePlanStartDate: false});
          }
        });
      });
    axios.get(`/api/exerciseplans/${Auth.currentUserId()}/future`, Auth.bearerHeader())
      .then(res => this.setState({futurePlans: res.data}));
  }


  createAdoptedPlan = () => {
    const adoptedPlan = this.packageAdoptionData();
    axios.post('/api/exerciseplans', adoptedPlan, Auth.bearerHeader())
      .then(() => this.props.history.push('/dashboard'))
      .catch(err => console.log('adoption error message: ', err));

    const feedBody = {
      user: Auth.currentUserId(),
      type: 'adoptPlan',
      exercisePlanId: this.state.newExercisePlanId
    };
    Request.updateFeed(feedBody);
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
      exercisePlanAdoptedFrom: exercisePlanAdoptedFrom,
      _id: this.state.newExercisePlanId
    };

    return packagedData;
  }

  render(){
    const { state } = this;
    const today = moment().format('YYYY-MM-DD');
    // console.log('state adopted from is', !!state.exercisePlanAdoptedFrom);
    // console.log('state exercise adopted from user is', state.exercisePlanAdoptedFrom);

    return(
      <section className='container'>
        {state.user &&
          <div className='columns is-multiline is-centered'>
            <div className=' column is-8 columns is-mobile is-multiline'>
              <div className='column is-5'>
                <h1 className='title is-5 white-title'>{state.name}</h1>

                <h1 className='title is-5 white-title'>{!state.exercisePlanAdoptedFrom ? state.user.tribe :  state.exercisePlanAdoptedFrom.user.tribe  }</h1>
                <h1 className='white-title sub-title'>Plan created by: {state.exercisePlanAdoptedFrom && state.exercisePlanAdoptedFrom.user.username  }</h1>
                <p className="white-title"><i className="fas fa-stopwatch fas-regular"></i> Average: {state.workoutTimeAvg} minutes</p>
                <p className="white-title"><i className="fas fa-fire fas-regular"></i>: {state.intensityAvg}</p>
              </div>
              <div className='column is-7 has-text-centered'>
                {!this.state.adopting ?
                  <button onClick={this.handleAdoption} className='button auth-button'>Want to Adopt?</button>
                  :
                  <div className="white-title">
                    <h4 className="sub-text">Choose a start date</h4>
                    <FormInput
                      name='newStartDate'
                      type='date'
                      min={today}
                      handleChange={this.handleChange}
                      state={this.state}
                    />
                    <hr />
                    <button onClick={this.handleAdoption} className='button auth-button'>Adopt</button>
                  </div>
                }

              </div>

              {/* day cards */}

              <div className='column is-12'>

                {Object.keys(state).map((key) => {
                  const dayNumber = key.slice(3);
                  if(!state[key].rest && state[key].intensity){
                    return <UpcomingCard key={key} title={`Day ${dayNumber}`} programDetails={state[key]} />;

                  }else if(state[key].rest){
                    return  <RestCard key={key} programDay={`Day ${dayNumber}`} title='Rest Day' />;
                  }
                })
                }
              </div>


            </div>
          </div>
        }
      </section>
    );
  }
}
