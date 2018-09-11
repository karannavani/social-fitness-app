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
    page: 1
  };

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {

      const paginateOptions = {
        // 'userId': Auth.currentUserId(),
        'page': this.state.page,
        'sort': {'createdAt': -1 },
        'populate': 'user exercisePlanId exercisePlanAdoptedFromId followUserId',
        'limit': 10
      };

      axios.post('/api/feed/paginate', paginateOptions)
        .then(res => {
          const sortedFeed = this.sertFeed(res.data.docs);
          this.setState({newsFeedItems: sortedFeed, pages: res.data.pages});
        });

    }
  }

  //returns an array of sorted plans
  sortFeed = (plansArr) => {
    return _.orderBy(plansArr, ['createdAt'], 'desc');
  }

  render(){
    const { newsFeedItems } = this.state;
    return(
      <section className='columns'>
        {newsFeedItems &&
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
        }
      </section>
    );
  }
}
