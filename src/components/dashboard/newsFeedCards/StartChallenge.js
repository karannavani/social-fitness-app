import React from 'react';
import { Link } from 'react-router-dom';
// import Auth from '../../../lib/Auth';

const StartChallenge = ({ user, challenge }) => {
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

          <p> Just took up the {challenge.name} challenge, potential for {challenge.challengeGrit} grit!</p>

          {/* CHANGEBLE CONTENT */}
        </div>

      </div>
    </article>
  );
};

export default StartChallenge;
