import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../../lib/Auth';

const NewsCardNewRegister = ({ user, created }) => {
  return(
    <article className="media">
      <figure className="media-left">
        <p className="image is-96x96">
          <img src={user.imageUrl}/>
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <div className="columns">
            <div className="column is-9">
              <Link to={`/profile/${user._id}`} className='title is-4 is-block sub-text' >{user.username}</Link>
              <Link to={`/tribe/${user.tribe}`} className='subtitle is-block sub-text'>{user.tribe} </Link>
            </div>
            <div className="column">
              <h5 className="subtitle is-6 sub-text white-title">{created}</h5>
            </div>
          </div>
          {/* CHANGEBLE CONTENT */}

          {Auth.currentUserId() === user._id ?
            <p className="news-feed-item-details">Welcome to Grit. Here are 100 grit points to say welcome to the tribe. </p>
            :
            <p className="news-feed-item-details"> Just join GRIT!
              {Auth.currentUserTribe() === user.tribe ? 'Give your tribe mate some love by recommending a program to do' : 'They will be hot on your heels, keep cracking'}</p>
          }


          {/* CHANGEBLE CONTENT */}
        </div>

      </div>
    </article>
  );
};

export default NewsCardNewRegister;
