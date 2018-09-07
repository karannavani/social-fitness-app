import React from 'react';

import Aside from './Aside';
import Feed from './Feed';

class Dashboard extends React.Component {
  render() {
    return(
      <div className="columns">
        <Aside />
        <Feed />
      </div>
    );
  }
}

export default Dashboard;
