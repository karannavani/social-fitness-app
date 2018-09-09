import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Graphs from './DataViz';

import Auth from '../lib/Auth';



class TribeAside extends React.Component {
  state = {
    tribeName: 'Gargantuans' // need to figure out a way to dynamically update
  }

  componentDidMount() {
    axios.get(`/api/tribes/${this.state.tribeName}`)
      .then(res => this.setState({ members: res.data}, () => {
        this.tribeWeight();
      } ));
    axios.get(`/api/users/${Auth.currentUserId()}`)
      .then(res => this.setState({ user: res.data }));
      // .then(res => console.log('user data is', res.data));


  }

  leadersSort = () => {
    const leaders = this.state.members;
    return _.orderBy(leaders, ['grit', 'username'], 'desc');
  }

  tribeWeight = () => {
    const tribeWeight = [];
    this.state.members.forEach(member => {
      tribeWeight.push(member.weight);
      const reducedWeight = (tribeWeight.reduce((a, b) => a + b) / tribeWeight.length);
      console.log('reducedWeight', reducedWeight);
      this.setState({ tribeWeight: reducedWeight }, () => {
        console.log('tribe weight on state is', this.state.tribeWeight);
      });
    });
  }

  dailyGrit = () => {
    return this.state.user.dailyGrit
  }


  render() {
    return (
      <div>
        {this.state &&
          <div className="columns">
            <div className="column is-4 is-3-desktop tribeAside">
              <div className="tribeAsideContainer">
                <h2 className="subtitle is-4 has-text-grey">YOUR TRIBE</h2>
                { this.state.user && this.state.tribeWeight && <div><p>{this.state.members.length} {this.state.tribeName}</p>
                  <p>Average weight: {this.state.tribeWeight}</p></div> }
              </div>
              <div className="tribeAsideContainer">
                <h2 className="subtitle is-4 has-text-grey">LEADER BOARD</h2>
                {this.state.members && this.leadersSort().slice(0, 10).map(leader =>
                  <div key={leader._id}>
                    {leader.username} Grit: {leader.grit}
                  </div>
                )}
              </div>
              <div className="tribeAsideContainer">
                <h2 className="subtitle is-4 has-text-grey">ADOPTED PROGRAMMES</h2>
              </div>
            </div>
            <div className="column is-8">
              <Graphs members={this.state.members} user={this.state.user}/>
            </div>
          </div>
        }
      </div>
    );
  }
}


export default TribeAside;
