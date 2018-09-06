// USER PROFILE SHOW
import React from 'react';

//dependancies
import axios from 'axios';

export default class ProfileShow extends React.Component{
  //get user data from API
  //put data on state which will update the display
  //determine if the logged in user is the current USER
  //  if so then show an edit profile form
  //  if not then show a follow button depending on if they are already following that user

  state={
    userId: '5b914f7a983c9e72d2aa113a'
  };

  componentDidMount(){
    axios.get(`/api/users/${this.state.userId}`)
      .then(res => this.setState({user}))
      // .then(res => console.log('The user data is: ', res.data));
  }

  render(){
    return(
      <section>
        {/* HERO */}
        <section className='hero is-medium is-primary'>
          <div className='hero-body'>
            <div className='container '>
              {/* PERSONAL DETAILS */}
              <div className='columns' style={{border: '1px solid black'}}>
                <div className='column is-full'>
                  <p className='title'>Personal Details</p>
                  <p></p>
                </div>
              </div>

              {/* TRIBE FOLLOWERS FOLLOWING */}
              <div className='columns' style={{border: '1px solid black'}}>
                <div className='column is-full'>

                  <p className='title'> TRIBE FOLLOWERS FOLLOWING</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HISTORY */}
        <section className='container'>
          {/* map over an array of past exercise */}
        </section>
      </section>
    );
  }
}
