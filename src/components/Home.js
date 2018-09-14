import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return(
    <div className="columns  is-multiline">
      <div className="column has-text-centered is-multiline">
        {/* <h1 className="home-title">GRIT</h1> */}
        <img src="../assets/GRIT-logo.png" alt="logo" className="logo"/>
        <hr className="hr2"></hr>
      </div>

      <p className="column is-full has-text-centered sub-text">Join a Tribe based on your exercise routines and <br/>
       earn Grit Points by taking on challenges, completing plans and showing that</p>
      <p className="bold-sub-text column is-full has-text-centered">you have grit.</p>
      {/* <p className="bold-sub-text column is-full has-text-centered">you have grit.</p> */}
      <p className="column is-full has-text-centered sub-text">You can track your progress and see how the rest of your Tribe are performing.</p>
      <div className="auth-button column is-1 is-offset-4 has-text-centered"><Link to='/login' className="">Login</Link></div>
      <div className="auth-button column is-1 is-offset-2 has-text-centered"><Link to='/register' className="">Sign Up</Link></div>
    </div>
  );
}

export default Home;
