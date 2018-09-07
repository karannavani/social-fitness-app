// USER PROFILE SHOW
import React from 'react';

//dependancies
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class UserShow extends React.Component{
  //get user data from API
  //put data on state which will update the display
  //determine if the logged in user is the current USER
  //  if so then show an edit profile form
  //  if not then show a follow button depending on if they are already following that user

  state={
    userId: '5b91752666708bc8b1622705'
  };

  componentDidMount(){
    axios.get(`/api/users/${this.state.userId}`)
      .then(res => this.setState({user: res.data}));
  }

  handleGoToTribe = () => {
    this.props.history.push(`/tribe/${this.state.user.tribe}`);
  }



  render(){
    const { user } = this.state;
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
                    <Link to={`/users/${user._id}/edit`} className="button is-rounded is-info">Edit Profile</Link>
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
        <section className='container'>
          <h2 className='title has-text-centered is-2'>History</h2>
          {/* map over an array of past exercise */}
        </section>
      </section>

    );
  }
}
