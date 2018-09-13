import React from 'react';
import { Link } from 'react-router-dom';
// import Auth from '../../../lib/Auth';

const NewFollow = ({ user, followedUser, created }) => {
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
              <h5 className="subtitle is-6 white-title">{created}</h5>
            </div>
          </div>
          {/* CHANGEBLE CONTENT */}

          <p className="news-feed-item-details"> Recently Followed {followedUser.username} </p>

          {/* CHANGEBLE CONTENT */}
        </div>

      </div>
    </article>
  );
};

export default NewFollow;
