import React from 'react';

//dependancies
import axios from 'axios';
import Auth from '../../lib/Auth';

//componenets
import NewsCardAdoptCreate from './newsFeedCards/AdoptCreate.js';

export default class NewsFeed extends React.Component{
  state={
    page: 1
  };

  componentDidMount(){
    const paginateOptions = {
      'userId': Auth.currentUserId(),
      'page': this.state.page,
      'sort': {'startDate': -1 },
      'populate': 'user exercisePlanId exercisePlanAdoptedFromId followUserId',
      'limit': 10
    };

    //returns 10 news items
    axios.post('/api/feed/paginate', paginateOptions)
      .then(res => {
        console.log('the feed items are', res.data);
        // console.log(`there are ${res.data.pages} pages for this user`);
        this.setState({newsFeedItems: res.data.docs, pages: res.data.pages});
      });
  }

  render(){
    const { newsFeedItems } = this.state;
    return(
      <section className='columns'>
        {newsFeedItems &&
          <div className='column is-12'>
            <NewsCardAdoptCreate
              user={newsFeedItems[0].user}
              type={newsFeedItems[0].type}
            />            
          </div>
        }
      </section>
    );
  }
}
