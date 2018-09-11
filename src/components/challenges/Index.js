import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';


export default class ChallengesIndex extends React.Component{
  state= {}

  componentDidMount() {
    axios.get('/api/challenges')
      .then(res => this.setState({ challenges: res.data }));
  }

  acceptChallenge = (challengeId) => {
    return () => {
      axios.post(`/api/challenges/${challengeId}`, { id: Auth.currentUserId()});
      this.setState({ show: true });
    };
  }


  render() {
    return(

      <div className="columns is-multiline">
        {this.state.challenges && this.state.challenges.map(challenge =>
          <div key= {challenge._id}className="column is-4 challenge card">
            <p className="challenge-title">{challenge.name}</p>
            <p className = "challenge-details">{challenge.challengeGrit} grit points</p>
            <p>{challenge.challengers.length} challengers</p>

            {!challenge.challengers.includes(Auth.currentUserId()) &&
            <p>Accept?
              <button onClick={this.acceptChallenge(challenge._id)}>
                <i className="far fa-check-circle"></i>
              </button>
            </p>}
          </div>
        )}

      </div>
    );
  }
}
