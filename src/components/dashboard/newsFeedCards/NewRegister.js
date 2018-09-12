import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../../lib/Auth';

const NewsCardNewRegister = ({ user }) => {
  return(
    <article className="media">
      <figure className="media-left">
        <p className="image is-96x96">
          <img src={user.imageUrl}/>
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <Link to={`/profile/${user._id}`} className='title is-4 is-block' >{user.username}</Link>
          <Link to={`/tribe/${user.tribe}`} className='subtitle is-block'>{user.tribe} </Link>

          {/* CHANGEBLE CONTENT */}

          {Auth.currentUserId() === user._id ?
            <p>Welcome to Grit. Here are 100 grit points to say welcome to the tribe. </p>
            :
            <p> Just join GRIT!
              {Auth.currentUserTribe() === user.tribe ? 'Give your tribe mate some love by recommending a program to do' : 'They will be hot on your heels, keep cracking'}</p>
          }


          {/* CHANGEBLE CONTENT */}
        </div>

        <nav className="level is-mobile">
          <div className="level-left">
            <a className="level-item">
              <span className="icon is-small"><i className="fas fa-reply"></i></span>
            </a>
            <a className="level-item">
              <span className="icon is-small"><i className="fas fa-retweet"></i></span>
            </a>
            <a className="level-item">
              <span className="icon is-small"><i className="fas fa-heart"></i></span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  );
};

export default NewsCardNewRegister;
