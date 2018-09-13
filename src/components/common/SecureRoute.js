import React from 'react';
import Auth from '../../lib/Auth';
import { Route, Redirect } from 'react-router-dom';

const SecureRoute = ({ exact, component, path }) =>{
  if(!Auth.isAuthenticated()){
    return <Redirect to='/login' />;
  }
  return(
    <Route exact={ exact } path={ path } component={ component }/>

    // possible to spread th props outs, no good as cant see what geos in!
    // <Route {...props}/>
  );
};

export default SecureRoute;
