import React from 'react';
import axios from 'axios';


class TribeAside extends React.Component {
  state = {
    tribeName: 'Gargantuans' // need to figure out a way to dynamically update
  }

  componentDidMount() {
    console.log('TribeAside Component Mounted');
    axios.get(`/api/tribes/${this.state.tribeName}`)
      .then(res => this.setState({ members: res.data} ));
  }

  // const leaderBoardMembers = []
  // this.state.members.sort()

  render() {
    return (
      <div className="columns">
        <div className="column is-4" style={{ backgroundColor: 'green', height: '100vh' }}>
          <div className="dashAsideFollowers" style={{ backgroundColor: 'white', height: '30vh', marginTop: '10px'}}>
            {this.state.members && <p>{this.state.tribeName} has {this.state.members.length} members</p>}
          </div>
          <div className="dashAsideLeaders" style={{ backgroundColor: 'white', height: '30vh', marginTop: '10px'}}>
            {/* {this.state.members && this.state.members.sort()} */}
          </div>
          <div className="dashAsidePrograms" style={{ backgroundColor: 'white', height: '30vh', marginTop: '10px'}}>

          </div>
          <div className="column is-8">

          </div>
        </div>
      </div>
    );
  }
}


export default TribeAside;
