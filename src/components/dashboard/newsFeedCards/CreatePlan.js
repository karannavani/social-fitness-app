import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const CreatePlan = ({ user, exercisePlan }) => {
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


          {/* IF TYPE IS CREATE */}

          <p> Created a new plan –
            <Link to={`/exerciseplan/${exercisePlan._id}`}> {exercisePlan.name} </Link>
            and has lined himself up for {exercisePlan.totalAvailableGrit} grit points, starting on {moment.unix(exercisePlan.startDate).format('DD/MM/YYYY')}
          </p>
          <p> The program is a total of {exercisePlan.totalTime} minutes and a {exercisePlan.intensityAvg} average intensity </p>


          {/* CHANGEBLE CONTENT */}
        </div>

      </div>
    </article>
  );
};

export default CreatePlan;
