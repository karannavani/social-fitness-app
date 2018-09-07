// USER PROFILE SHOW
import React from 'react';
//5b91752666708bc8b1622706


//dependancies
import { Link } from 'react-router-dom';
import axios from 'axios';
import Auth from '../../lib/Auth';

export default class UserShow extends React.Component{
  state={};

  componentDidMount(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({user: res.data}));
  }

  componentDidUpdate(){
    console.log('This is the users page=======> ', this.isUsersPage());
    console.log('The user is following this page=======> ', this.isFollowing());
  }

  handleGoToTribe = () => {
    this.props.history.push(`/tribe/${this.state.user.tribe}`);
  }
  //determine if user is looking at there own page
  //if not then show them a follow/unfollow button depending on if they follow one another
  //  if they are following, render an unfollow button.
  //  if no then render a follow button

  //returns true if the current user is viewing their own profile
  isUsersPage = () => {
    if(Auth.currentUserId() === (this.props.match.params.id)) return true;
    return false;
  }

  // returns true if viewer (logged in user) is following the displayed user
  isFollowing = () => {
    //see if following array includes the visited users id
    console.log('the displayed user id is: ', this.props.match.params.id);
    return this.state.user.followers.includes(Auth.currentUserId());
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

                  {this.isUsersPage() ?
                    <div className=" column is-1">
                      <Link to={`/users/${user._id}/edit`} className="button is-rounded is-info">Edit Profile</Link>
                    </div>
                    :
                    <div className=" column is-1">
                      <button className="button is-rounded is-success">Follow</button>
                    </div>
                  }

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
