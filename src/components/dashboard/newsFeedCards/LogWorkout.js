import React from 'react';
import { Link } from 'react-router-dom';

const LogWorkout = ({ user, exercisePlan, grit, time, intensity, created }) => {
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
          <p className="news-feed-item-details">Completed a {time} minutes long workout today at {intensity.toLowerCase()} intensity,
            bringing in {grit} grit points!</p>
          <div className="card">
            <div className="card-content card-completed">
              <span className="feedLogWorkout"><i className="fas fa-stopwatch fas-regular"></i> {time}</span>
              <span className="feedLogWorkout"><i className="fas fa-fire fas-regular"></i> {intensity}</span>
              <span className="feedLogWorkout"><i className="fas fa-bolt fas-regular"></i> {grit}</span>
            </div>
          </div>
          <Link to={`/exerciseplan/${exercisePlan._id}`}>Check out the plan here</Link>
          {/* CHANGEBLE CONTENT */}
        </div>

      </div>
    </article>
  );
};

export default LogWorkout;
