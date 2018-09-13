import React from 'react';

//dependancies
import axios from 'axios';
import _ from 'lodash';
import Auth from '../../lib/Auth';

//componenets
import NewsCardNewRegister from './newsFeedCards/NewRegister.js';
import AdoptPlan from './newsFeedCards/AdoptPlan';
import CreatePlan from './newsFeedCards/CreatePlan';
import LogWorkout from './newsFeedCards/LogWorkout';
import StartChallenge from './newsFeedCards/StartChallenge';
import CompleteChallenge from './newsFeedCards/CompleteChallenge';
import NewFollow from './newsFeedCards/NewFollow';

export default class NewsFeed extends React.Component{
  state={
    page: 1,
    limit: [10],
    loadClick: 1,
    loadButton: true
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props || prevState.limit !== this.state.limit) {
      const paginateOptions = {
        'page': this.state.page,
        'sort': {'createdAt': -1 },
        'populate': 'user exercisePlanId challengeId exercisePlanAdoptedFromId followUserId',
        'limit': this.state.limit[0]
      };

      axios.post('/api/feed/paginate', paginateOptions, Auth.bearerHeader())
        .then(res => {
          const sortedFeed = this.sortFeed(res.data.docs);
          this.setState({newsFeedItems: sortedFeed, pages: res.data.pages, total: res.data.total });
        });
    }
  }

  //returns an array of sorted feed items
  sortFeed = (plansArr) => {
    return _.orderBy(plansArr, ['createdAt'], 'desc');
  }

  handleLoadMoreNews = () => {
    const newLimit = this.state.limit.slice();
    newLimit[0] += 10;

    let loadClick = this.state.loadClick;
    loadClick++;

    this.setState({limit: newLimit, loadClick}, () => {
      if (this.state.loadClick === this.state.pages) {
        this.setState({ loadButton: false });
      }

    });

    // if (this.state.total )
  }

  render(){
    const { newsFeedItems } = this.state;
    console.log('news feed items are', newsFeedItems);
    return(
      <section className='container'>
        {newsFeedItems &&
      <section className='columns is-multiline'>
        <div className='column is-8 is-centered is-mobile'>
          {newsFeedItems.map(newsFeedItem => {
            switch(newsFeedItem.type){
              case 'adoptPlan':
                return(
                  <AdoptPlan
                    key={newsFeedItem._id}
                    user={newsFeedItem.user}
                    exercisePlan={newsFeedItem.exercisePlanId}
                    created = {newsFeedItem.daysAgoCreated}
                  />
                );
              case 'createPlan':
                return(
                  <CreatePlan
                    key={newsFeedItem._id}
                    user={newsFeedItem.user}
                    exercisePlan={newsFeedItem.exercisePlanId}
                    created = {newsFeedItem.daysAgoCreated}
                  />
                );
              case 'logWorkout':
                return(
                  <LogWorkout key = {newsFeedItem._id}
                    user={newsFeedItem.user}
                    exercisePlan={newsFeedItem.exercisePlanId}
                    grit = {newsFeedItem.grit}
                    time = {newsFeedItem.time}
                    intensity = {newsFeedItem.intensity}
                    created = {newsFeedItem.daysAgoCreated}
                  />
                );
              case 'register':
                return(
                  <NewsCardNewRegister
                    key = {newsFeedItem._id}
                    user={newsFeedItem.user}
                    created = {newsFeedItem.daysAgoCreated}
                  />
                );
              case 'createChallenge':
                return(
                  <StartChallenge
                    key = {newsFeedItem._id}
                    user = {newsFeedItem.user}
                    challenge = {newsFeedItem.challengeId}
                    created = {newsFeedItem.daysAgoCreated}
                  />
                );
              case 'completeChallenge':
                return(
                  <CompleteChallenge
                    key = {newsFeedItem._id}
                    user = {newsFeedItem.user}
                    challenge = {newsFeedItem.challengeId}
                    created = {newsFeedItem.daysAgoCreated}
                  />
                );
              case 'follow':
                return(
                  <NewFollow
                    key = {newsFeedItem._id}
                    user = {newsFeedItem.user}
                    followedUser = {newsFeedItem.followedUserId}
                    created = {newsFeedItem.daysAgoCreated}
                  />
                );
            }
          }
          )}
        </div>
        { this.state.loadButton &&
        <div className='column is-full has-text-centered'>
          <a onClick={this.handleLoadMoreNews}>Click to load more</a>
        </div>
        }
      </section>
        }
      </section>
    );
  }
}
