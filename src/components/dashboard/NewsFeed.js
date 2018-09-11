import React from 'react';

//dependancies
import axios from 'axios';
// import Auth from '../../lib/Auth';
import _ from 'lodash';

//componenets
import NewsCardAdoptCreate from './newsFeedCards/AdoptCreate.js';
import NewsCardNewRegister from './newsFeedCards/NewRegister.js';

export default class NewsFeed extends React.Component{
  state={
    page: 1,
    limit: [3]
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('component tried to update outside');
    // console.log('prev state.limit is ', prevState.limit);
    // console.log('this.state.limit is ', this.state.limit);
    if(prevProps !== this.props || prevState.limit !== this.state.limit) {
      console.log('component tried to update');
      const paginateOptions = {
        'page': this.state.page,
        'sort': {'createdAt': -1 },
        'populate': 'user exercisePlanId exercisePlanAdoptedFromId followUserId',
        'limit': this.state.limit[0]
      };

      axios.post('/api/feed/paginate', paginateOptions)
        .then(res => {
          const sortedFeed = this.sortFeed(res.data.docs);
          this.setState({newsFeedItems: sortedFeed, pages: res.data.pages});
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
                  case 'adoptPlan':
                    return(
                      <NewsCardAdoptCreate
                        key={newsFeedItem._id}
                        user={newsFeedItem.user}
                        type={newsFeedItem.type}
                        exercisePlan={newsFeedItem.exercisePlanId}
                      />
                    );
                  case 'register':
                    return(
                      <NewsCardNewRegister
                        user={newsFeedItem.user}
                      />
                    );
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
