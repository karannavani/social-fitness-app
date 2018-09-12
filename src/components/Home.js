import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return(
    <div className="columns  is-multiline">
      <div className="column has-text-centered is-multiline">
        <h1 className="title is-1 page-title-large">Welcome to Grit!</h1>
        <hr />
      </div>
      <p className="column is-full has-text-centered">Join a Tribe based on your exercise routines and earn Grit Points by taking on challenges, completing plans and showing that you have Grit.</p>
      <p className="column is-full has-text-centered">You can track your progress and see how the rest of your Tribe are performing.</p>
      <Link to='/login' className="column is-2 is-offset-3 button is-info">Login</Link>
      <Link to='/register' className="column is-2 is-offset-2 button is-info">Sign Up</Link>
    </div>
  );
}

export default Home;
