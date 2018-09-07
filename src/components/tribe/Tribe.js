import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Graphs from './DataViz';



class TribeAside extends React.Component {
  state = {
    tribeName: 'Gargantuans' // need to figure out a way to dynamically update
  }

  componentDidMount() {
    axios.get(`/api/tribes/${this.state.tribeName}`)
      .then(res => this.setState({ members: res.data} ));
    axios.get('/api/users/5b91752666708bc8b1622706')
      .then(res => this.setState({ user: res.data }));
  }

  getCurrentUser = () => {
    console.log('Current user is', this.state.user.age);
  }

  leadersSort = () => {
    const leaders = this.state.members;
    return _.orderBy(leaders, ['grit', 'username'], 'desc');
  }

  render() {
    return (
      <div>
        {this.state &&
          <div className="columns">
            <div className="column is-4 tribeAside">
              <div className="dashAsideContainer">
                <p>YOUR TRIBE</p>
                {this.state.members && this.state.user && <p>{this.state.tribeName} has {this.state.members.length} {this.getCurrentUser()} members</p>}
              </div>
              <div className="dashAsideContainer">
                <p>LEADER BOARD</p>
                {this.state.members && this.leadersSort().slice(0, 10).map(leader =>
                  <div key={leader._id}>
                    {leader.username} Grit: {leader.grit}
                  </div>
                )}
              </div>
              <div className="dashAsideContainer">
                <p>ADOPTED PROGRAMMES</p>
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
