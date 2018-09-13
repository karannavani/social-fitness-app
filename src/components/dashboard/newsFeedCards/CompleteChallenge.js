import React from 'react';
import { Link } from 'react-router-dom';
// import Auth from '../../../lib/Auth';

const CompleteChallenge = ({ user, challenge }) => {
  // console.log('this is start challenge ', challenge.toString());
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

          <p> Completed the {challenge.name} challenge and earned {challenge.challengeGrit} grit </p>

          {/* CHANGEBLE CONTENT */}
        </div>

      </div>
    </article>
  );
};

export default CompleteChallenge;
