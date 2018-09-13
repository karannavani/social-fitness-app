import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Graphs from './DataViz';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class TribeAside extends React.Component {
  state = {}

  componentDidMount() {
    axios.get(`/api/tribes/${this.props.match.params.tribeName}`, Auth.bearerHeader())
      .then(res => this.setState({ members: res.data, tribeName: this.props.match.params.tribeName }, () => {
        this.tribeWeight();
      } ));
    axios.get(`/api/users/${Auth.currentUserId()}`, Auth.bearerHeader())
      .then(res => this.setState({ user: res.data }));
    // .then(res => console.log('user data is', res.data));
  }

  leadersSort = () => { // this is the leaderboard
    const leaders = this.state.members;
    return _.orderBy(leaders, ['grit', 'username'], 'desc');
  }

  tribeWeight = () => {
    const tribeWeight = [];
    this.state.members.forEach(member => {
      tribeWeight.push(member.weight);
      const reducedWeight = (tribeWeight.reduce((a, b) => {
        return (a + b);
      }, 0)/ tribeWeight.length);
      this.setState({ tribeWeight: reducedWeight }, () => {
      });
    });
  }

  dailyGrit = () => {
    return this.state.user.dailyGrit;
  }

  render() {
    return (
      <div className="container">
        {this.state &&
          <div className="columns">
            <div className="column is-4 is-3-desktop aside">
              <h2 className="page-title-small">YOUR TRIBE</h2>
              <div className="tribeAsideContainer-tribe">
                { this.state.user && this.state.tribeWeight && <div>
                  <p className="page-title-small">{this.state.tribeName}</p>
                  <p className="upcomingDetails">Members: {this.state.members.length}</p>
                  <p className="upcomingDetails">Average weight: {this.state.tribeWeight.toFixed(2)}</p></div> }
              </div>
              <h2 className="page-title-small">LEADER BOARD</h2>
              <div className="tribeAsideContainer-leader">
                {this.state.members && this.leadersSort().slice(0, 10).map(leader =>
                  <div className="columns upcomingDetails" key={leader._id}>
                    <Link to={`/profile/${leader._id}`} >
                      <div className="column each-leader">
                        {leader.username} Grit: {leader.grit}
                      </div>
                    </Link>
                  </div>
                )}
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
