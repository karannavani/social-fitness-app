import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return(
    <div className="columns">
      <div className="column is-multiline has-text-centered">
        <h1 className="title is-1">Welcome to Grit!</h1>
        <hr />
        <p className="column is-full">Join a Tribe based on your exercise routines and earn Grit Points by taking on challenges, completing plans and showing that you have Grit.</p>
        <p className="column is-full">You can track your progress and see how the rest of your Tribe are performing.</p>
        <Link to='/login' className="column is-half button">Login</Link>
        <Link to='/register' className="column is-half button">Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;
