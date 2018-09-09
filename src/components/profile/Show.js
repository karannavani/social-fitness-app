// USER PROFILE SHOW
import React from 'react';

//dependancies
import { Link } from 'react-router-dom';
import axios from 'axios';
import Auth from '../../lib/Auth';
import _ from 'lodash';

//Components
import SortSelect from '../common/SortSelect';
import FilterBar from './FilterBar';

export default class UserShow extends React.Component{
  state={
    sortString: 'startDate|asc',
    sortOptions: [
      {value: 'totalGrit|desc', label: 'Grit (Highest First)' },
      {value: 'totalGrit|asc', label: 'Grit (Lowest First)' },
      {value: 'totalTime|desc', label: 'Longest Plan' },
      {value: 'totalTime|asc', label: 'Shortest Plan' },
      {value: 'workoutTimeAvg|desc', label: 'Long Workouts' },
      {value: 'workoutTimeAvg|asc', label: 'Short Workouts first' },
      {value: 'startDate|desc', label: 'Start Date (New to Old)' },
      {value: 'startDate|asc', label: 'Start Date (Old to New' }
    ],
    filterIntensityOptions: [
      {label: 'Low Intensity', value: 'Low', active: true},
      {label: 'Medium Intensity', value: 'Medium', active: true},
      {label: 'High Intensity', value: 'High', active: true}
    ]
  };

  componentDidMount(){
    this.fetchUserData();
  }

  componentDidUpdate(prevProps){
    if(prevProps.location.pathname !== this.props.location.pathname){
      this.fetchUserData();
    }
  }

  fetchUserData = () => {
    const userId = this.props.match.params.id;
    axios.get(`/api/users/${userId}`)
      .then(res => this.setState({user: res.data}));

    axios.get('/api/exerciseplans')
      .then(res => {
        const usersExercisePlans = res.data.filter(exercisePlan => exercisePlan.user.includes(userId) );
        this.setState({exercisePlans: usersExercisePlans});
      });
  }

  //returns an array of sorted plans
  sortPlans = (plansArr) => {
    const [ field, order] = this.state.sortString.split('|');
    return _.orderBy(plansArr, [field], order);
    // this.setState({exercisePlans: sortedPlans});
  }

  // returns an array of plans filted by the checked options
  filterByOptions = (planArr) => {
    return planArr.filter(plan =>
      this.state.filterIntensityOptions.some(option => {
        return option.active && plan.intensityAvg === option.value;
      }));
  }

  sortedFilteredPlans = () => {
    const filteredOptions = this.filterByOptions(this.state.exercisePlans);
    return this.sortPlans(filteredOptions);
  }

  handleGoToTribe = () => {
    this.props.history.push(`/tribe/${this.state.user.tribe}`);
  }

  //returns true if the current user is viewing their own profile
  isUsersPage = () => {
    if(Auth.currentUserId() === (this.props.match.params.id)) return true;
    return false;
  }

  // returns true if viewer (logged in user) is following the displayed user
  isFollowing = () => {
    return this.state.user.followers.includes(Auth.currentUserId());
  }

  // NOTE: might have a case where clicking fast will allow user to unfollow twice.
  handleUnFollow = () =>{
    axios.put(`/api/users/${Auth.currentUserId()}/follow`, {id: this.props.match.params.id})
      .then(res => {
        this.setState({ user: res.data });
      });
  }

  handleFollow = () =>{
    axios.post(`/api/users/${Auth.currentUserId()}/follow`, {id: this.props.match.params.id})
      .then(res => {
        this.setState({ user: res.data });
      });
  }

  handleSortSelectChange = ({ target }) => {
    this.setState({sortString: target.value});
  }

  handleFilterChange = ({target}) => {
    const filterIntensityOptions = this.state.filterIntensityOptions.slice();
    filterIntensityOptions.forEach(option => {
      if(option.value === target.name || target.name === 'all'){
        option.active = target.checked;
      }
    });
    this.setState({ filterIntensityOptions });
  }

  render(){
    const { user, exercisePlans, sortOptions } = this.state;
    // const this.filterByOptions()
    return(
      <section>
        {/* HERO */}
        {user &&
          <section className='hero is-medium is-primary'>
            <div className='hero-body'>
              <div className='container '>
                {/* PERSONAL DETAILS */}
                <section className=' columns'>
                  <figure className="column is-2">
                    <p className="image is-128x128">
                      <img src={user.imageUrl} />
                    </p>
                  </figure>
                  <div className=" column is-9">
                    <div className="content">
                      <h2 className='title is-4'> <strong>{user.username}</strong> </h2>
                      <p className='subtitle '>{user.firstName} {user.surname}</p>
                      <hr/>
                      <p>Height: {user.height}{user.heightUnit}</p>
                      <p>Weight: {user.weight}{user.weightUnit}</p>
                      <p>Age:{user.age}</p>
                    </div>
                  </div>

                  <div className=" column is-1">
                    {this.isUsersPage() ?
                      <Link to={`/users/${user._id}/edit`} className="button is-rounded is-info"><i className="far fa-edit"></i>Profile</Link>
                      :
                      <div>
                        {this.isFollowing() ?
                          <button
                            onClick={ this.handleUnFollow }
                            className="button is-rounded is-info"><i className="fas fa-sm fa-minus"></i>  Unfollow</button>
                          :
                          <button
                            onClick={ this.handleFollow }
                            className="button is-rounded is-info"><i className="fas fa-sm fa-plus"></i>  Follow</button>
                        }
                      </div>
                    }
                  </div>

                </section>

                {/* TRIBE FOLLOWERS FOLLOWING */}

                <div className='columns' style={{border: '1px solid black'}}>
                  <div onClick={this.handleGoToTribe} className='column is-4 has-text-centered'>
                    <p > {user.tribe}</p>
                  </div>
                  <div className='column is-4 has-text-centered'>
                    <p >{user.followers.length} Followers</p>
                  </div>
                  <div className='column is-4 has-text-centered'>
                    <p > Following {user.following.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        }

        {/* HISTORY */}
        <section id="history" className='container'>
          <h2  className='title has-text-centered is-2'>History</h2>
          {/* map over an array of past exercise */}
          <div className='columns is-multiline'>
            <section className='column is-12 columns'>
              <div className='column is-6'>
                <SortSelect
                  options={sortOptions}
                  title='Sort Plans'
                  handleChange={this.handleSortSelectChange}
                />
              </div>
              <div className='column is-6'>
                <FilterBar
                  options={this.state.filterIntensityOptions}
                  handleChange={this.handleFilterChange}

                />
              </div>
              <hr/>
            </section>

            {exercisePlans && this.sortedFilteredPlans().map( exercisePlan =>
              <Link to={`/exerciseplan/${exercisePlan._id}`} key={exercisePlan._id} className='column is-3 box'>
                {exercisePlan.exercisePlanAdoptedFrom && <i className="far fa-copy"></i>}
                <p><i className="far fa-hand-rock"></i>: {exercisePlan.totalGrit}</p>
                <p><i className="far fa-calendar-times"></i>: {exercisePlan.formattedStartDate}</p>
                <p><i className="fab fa-gripfire"></i>: {exercisePlan.intensityAvg}</p>
                <p><i className="far fa-clock"></i> Total:{exercisePlan.totalTime} min</p>
                <p><i className="far fa-clock"></i> Average: {exercisePlan.workoutTimeAvg} min/day</p>
                <p>Completed Days: {exercisePlan.completedDays}</p>
                <p>Rest Days: {exercisePlan.restDays}</p>
              </Link>
            )}
          </div>
        </section>
      </section>

    );
  }
}
