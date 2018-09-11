import React from 'react';

//dependancies
import axios from 'axios';
import Auth from '../../lib/Auth';

//componenets
import AdoptPlan from './newsFeedCards/AdoptPlan';
import CreatePlan from './newsFeedCards/CreatePlan';
import LogWorkout from './newsFeedCards/LogWorkout';

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


    this.setState({ paginateOptions });
    //returns 10 news items
  }

  componentDidUpdate(prevProps) {
    if(prevProps !== this.props) {
      axios.post('/api/feed/paginate', this.state.paginateOptions)
        .then(res => {
          console.log('the feed items are', res.data);
          // console.log(`there are ${res.data.pages} pages for this user`);
          this.setState({newsFeedItems: res.data.docs, pages: res.data.pages});
        });

    }
  }

  render(){
    const { newsFeedItems } = this.state;
    return(
      <section className='columns'>
        {newsFeedItems &&
          <div className='column is-8 is-centered is-mobile'>
            {newsFeedItems.map((newsFeedItem, i) => {
              switch(newsFeedItem.type){
                case 'adoptPlan':
                  return(
                    <AdoptPlan
                      key={newsFeedItem._id}
                      user={newsFeedItem.user}
                      exercisePlan={newsFeedItem.exercisePlanId}
                    />
                  );
                case 'createPlan':
                  return(
                    <CreatePlan
                      key={newsFeedItem._id}
                      user={newsFeedItem.user}
                      exercisePlan={newsFeedItem.exercisePlanId}
                    />
                  );
                case 'logWorkout':
                  return(
                    <LogWorkout key = {i}
                      user={newsFeedItem.user}
                      exercisePlan={newsFeedItem.exercisePlanId}
                      grit = {newsFeedItem.grit}
                      time = {newsFeedItem.time}
                      intensity = {newsFeedItem.intensity}
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
