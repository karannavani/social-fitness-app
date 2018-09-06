import React from 'react';
import axios from 'axios';

export default class Dashboard extends React.Component {
  state = {}

  render() {
    return(
      <div className="columns">
        <div className="column is-3" style={{ backgroundColor: '#12233e', height: '100vh', overflow: 'auto'}}>
          <h3 className="title is-3 title-white">{'Today\'s Plan'}</h3>
        </div>
        <div className="column is-9" style={{ backgroundColor: '#F5F5F5', height: '100vh', overflow: 'auto'}}>

        </div>
      </div>
    );
  }
}
