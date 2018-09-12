import React from 'react';

//dependancies
import axios from 'axios';
// import Auth from '../../lib/Auth';
import _ from 'lodash';

//componenets
import NewsCardNewRegister from './newsFeedCards/NewRegister.js';

import AdoptPlan from './newsFeedCards/AdoptPlan';
import CreatePlan from './newsFeedCards/CreatePlan';
import LogWorkout from './newsFeedCards/LogWorkout';

export default class NewsFeed extends React.Component{
  state={
    page: 1,
    limit: [3]
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props || prevState.limit !== this.state.limit) {
      const paginateOptions = {
        'page': this.state.page,
        'sort': {'createdAt': -1 },
        'populate': 'user exercisePlanId exercisePlanAdoptedFromId followUserId',
        'limit': this.state.limit[0]
      };

      axios.post('/api/feed/paginate', paginateOptions)
        .then(res => {
          const sortedFeed = this.sortFeed(res.data.docs);
          this.setState({newsFeedItems: sortedFeed, pages: res.data.pages},
            () => console.log('news feed state is', this.state));
        });
    }
  }

  //returns an array of sorted feed items
  sortFeed = (plansArr) => {
    return _.orderBy(plansArr, ['createdAt'], 'desc');
  }

  handleLoadMoreNews = () => {
    const newLimit = this.state.limit.slice();
    newLimit[0] += 3;

    this.setState({limit: newLimit}, ()=> console.log('the new state is', this.state));
  }

  render(){
    const { newsFeedItems } = this.state;
    return(
      <section className='container'>
        {newsFeedItems &&
      <section className='columns is-multiline'>
        <div className='column is-8 is-centered is-mobile'>
          {newsFeedItems.map(newsFeedItem => {
            switch(newsFeedItem.type){
              // case 'adoptPlan':
              //   return(
              //     <AdoptPlan
              //       key={newsFeedItem._id}
              //       user={newsFeedItem.user}
              //       exercisePlan={newsFeedItem.exercisePlanId}
              //     />
              //   );
              // case 'createPlan':
              //   return(
              //     <CreatePlan
              //       key={newsFeedItem._id}
              //       user={newsFeedItem.user}
              //       exercisePlan={newsFeedItem.exercisePlanId}
              //     />
              //   );
              // case 'logWorkout':
              //   return(
              //     <LogWorkout key = {newsFeedItem._id}
              //       user={newsFeedItem.user}
              //       exercisePlan={newsFeedItem.exercisePlanId}
              //       grit = {newsFeedItem.grit}
              //       time = {newsFeedItem.time}
              //       intensity = {newsFeedItem.intensity}
              //     />
              //   );
              // case 'register':
              //   return(
              //     <NewsCardNewRegister
              //       key = {newsFeedItem._id}
              //       user={newsFeedItem.user}
              //     />
              //   );
            }
          }
          )}
        </div>
        <div className='column is-full has-text-centered'>
          <a onClick={this.handleLoadMoreNews}>Click to load more</a>
        </div>
      </section>
        }
      </section>
    );
  }
}
