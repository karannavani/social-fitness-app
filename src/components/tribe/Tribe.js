import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Graphs from './DataViz';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class TribeAside extends React.Component {
  state = {}

  componentDidMount() {
    axios.get(`/api/tribes/${this.props.match.params.tribeName}`)
      .then(res => this.setState({ members: res.data, tribeName: this.props.match.params.tribeName }, () => {
        this.tribeWeight();
      } ));
    axios.get(`/api/users/${Auth.currentUserId()}`)
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
      <div>
        {this.state &&
          <div className="columns">
            <div className="column is-4 is-3-desktop tribeAside">
              <div className="tribeAsideContainer">
                <h2 className="subtitle is-4 page-title-large">YOUR TRIBE</h2>
                { this.state.user && this.state.tribeWeight && <div><p>{this.state.members.length} {this.state.tribeName}</p>
                  <p>Average weight: {this.state.tribeWeight.toFixed(2)}</p></div> }
                <Link to='/exerciseplan/new'><button className="button is-info is-outlined is-rounded">Create plan</button></Link>
              </div>
              <div className="tribeAsideContainer">
                <h2 className="subtitle is-4 has-text-grey">LEADER BOARD</h2>
                {this.state.members && this.leadersSort().slice(0, 10).map(leader =>
                  <div className="columns" key={leader._id}>
                    <Link to={`/profile/${leader._id}`} >
                      <div className="column card each-leader">
                        {leader.username} Grit: {leader.grit}
                      </div>
                    </Link>
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
