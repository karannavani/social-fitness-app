// USER PROFILE SHOW
import React from 'react';

//dependancies
import axios from 'axios';
import _ from 'lodash';
import Auth from '../../lib/Auth';
import Request from '../../lib/Request';

//Components
import { Link } from 'react-router-dom';
import SortSelect from '../common/SortSelect';
import Paginate from '../common/Paginate';
import FilterBar from './FilterBar';
import PlanHistoryCard from './PlanHistoryCard';

export default class UserShow extends React.Component{
  state={
    sortString: 'startDate|desc',
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
      {label: 'Low', value: 'Low', active: true},
      {label: 'Medium', value: 'Medium', active: true},
      {label: 'High', value: 'High', active: true}
    ],
    page: 1
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
    axios.get(`/api/users/${userId}`, Auth.bearerHeader())
      .then(res => this.setState({user: res.data}));


    this.fetchPaginatePlanHistory();
  }

  fetchPaginatePlanHistory = () => {
    const userId = this.props.match.params.id;
    const paginateOptions = {
      'userId': userId,
      'page': this.state.page,
      'sort': {'startDate': -1 },
      'populate': 'user',
      'limit': 10
    };

    //returns 10 user exercises and sorts then by startDate with newest first.
    axios.post('/api/exerciseplans/paginate', paginateOptions, Auth.bearerHeader())
      .then(res => {
        // console.log(`there are ${res.data.pages} pages for this user`);
        const planDateAsc = this.sortPlans(res.data.docs);
        this.setState({exercisePlans: planDateAsc, pages: res.data.pages});
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
    axios.put(`/api/users/${Auth.currentUserId()}/follow`, {id: this.props.match.params.id}, Auth.bearerHeader())
      .then(res => {
        this.setState({ user: res.data });
      });
  }

    handleFollow = () =>{
      const viewedUserId = this.props.match.params.id;

      axios.post(`/api/users/${Auth.currentUserId()}/follow`, {id: viewedUserId}, Auth.bearerHeader())
        .then(res => {
          this.setState({ user: res.data });
        });

      const newFollowBody = {
        user: Auth.currentUserId(),
        type: 'follow',
        followedUserId: viewedUserId
      };

      Request.updateFeed(newFollowBody);
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

    handlePageChange = (page) => {
      return () => {
        this.setState({page}, () => this.fetchPaginatePlanHistory());
      };
    };

    render(){
      const { user, exercisePlans, sortOptions } = this.state;


      // const this.filterByOptions()
      return(
        <section>
          {/* HERO */}
          {user &&
            <div className='container '>
              {/* PERSONAL DETAILS */}
              <section className='columns'>

                <div className="column is-2 is-offset-2">
                  <p className="image is-128x128">
                    <img className="profile-picture" src={user.imageUrl} />
                  </p>

                  <div>
                    {this.isUsersPage() ?
                      <Link to={`/users/${user._id}/edit`} className="button is-rounded is-info"><i className="far fa-edit"></i></Link>
                      :
                      <div>
                        {this.isFollowing() ?
                          <button
                            onClick={ this.handleUnFollow }
                            className="button is-rounded is-info">Unfollow</button>
                          :
                          <button
                            onClick={ this.handleFollow }
                            className="button is-rounded is-info">Follow</button>
                        }
                      </div>
                    }
                  </div>
                </div>

                <div className="column is-3 is-offset-1">
                  <div className="content">
                    <h2 className="page-title-small">{user.username}</h2>
                    <p className="sub-text">{user.firstName} {user.surname}</p>
                    <p className="sub-text">Height: {user.height}{user.heightUnit}</p>
                    <p className="sub-text">Weight: {user.weight}{user.weightUnit}</p>
                    <p className="sub-text">Age: {user.age}</p>
                  </div>
                </div>


                {/* TRIBE FOLLOWERS FOLLOWING */}
                <div className='column is-2 is-offset-1'>
                  <div onClick={this.handleGoToTribe} >
                    <p className="page-title-small"> {user.tribe}</p>
                  </div>
                  <p className="sub-text">{user.followers.length} Followers</p>
                  <p className="sub-text"> Following {user.following.length}</p>
                </div>

              </section>
            </div>

          }
          <hr />
          {/* HISTORY */}
          <section className='container'>
            <h2  className='page-title-large'>History</h2>


            {exercisePlans && user && !exercisePlans.length ?
              <div className="sub-text"> You dont have any plans yet.
                <Link to='/exerciseplan/new'>Click</Link> here to create one or visit your
                <Link to={`/tribe/${user.tribe}`}> tribes</Link>  page and adopt one
              </div>
              :
              <div className='columns is-centered is-multiline'>

                <section className='columns is-centered is-multiline'>
                  <div className='column is-5
                    6'>
                    <SortSelect
                      options={sortOptions}
                      title='Sort Plans'
                      handleChange={this.handleSortSelectChange}
                    />
                  </div>

                  <div className='column is-7'>
                    <h1 className="sub-text">Filter by intensity</h1>
                    <FilterBar
                      options={this.state.filterIntensityOptions}
                      handleChange={this.handleFilterChange}
                    />
                  </div>
                  <hr/>
                </section>

                <div className="columns is-centered is-multiline">
                  {exercisePlans && this.sortedFilteredPlans().map( exercisePlan =>

                    <PlanHistoryCard
                      plan={ exercisePlan }
                      key={exercisePlan._id}
                      keyId={exercisePlan._id}
                    />
                  )}

                  {this.state.pages &&
                      <div className='column is-4 is-offset-2 has-text-centered'>
                        <Paginate
                          currentPage={this.state.page}
                          startPage={1}
                          endPage={this.state.pages}
                          handleClick={this.handlePageChange}
                        />
                      </div>
                  }
                </div>
              </div>
            }
          </section>
        </section>

      );
    }
}
