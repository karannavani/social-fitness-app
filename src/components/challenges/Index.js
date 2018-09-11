import React from 'react';
import axios from 'axios';

export default class ChallengesIndex extends React.Component{
  state= {}

  componentDidMount() {
    axios.get('/api/challenges')
      .then(res => this.setState({ challenges: res.data }, () => {
        console.log('challenges are', this.state.challenges);
      }));
  }

  render() {
    // const challenges = this.state.challenges;
    return(
      <div className="columns is-multiline">

        {this.state.challenges && this.state.challenges.map(challenge =>
          <div key= {challenge._id}className="column is-full">{challenge.name}</div>
        )}


      </div>
    );
  }
}
