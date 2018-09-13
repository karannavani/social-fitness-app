import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

// Components
import ChallengeCard from './ChallengeCard';


export default class ChallengesIndex extends React.Component{
  state= { }

  componentDidUpdate() {

    axios.get('/api/challenges')
      .then(res => this.setState({ challenges: res.data }), Auth.bearerHeader());
  }

  render() {
    return(

      <div className="columns is-multiline">
        {this.state.challenges && this.state.challenges.map(challenge =>

          <ChallengeCard
            key={challenge._id}
            challenge={challenge}
            handleClick={this.acceptChallenge}
          />
        )}

      </div>
    );
  }
}
