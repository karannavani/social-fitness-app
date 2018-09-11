import React from 'react';
import Auth from '../../lib/Auth';
import axios from 'axios';

export default class ChallengeCard extends React.Component{
  state={
    accepted: false
  }

  componentDidUpdate(prevProps){
    if(prevProps !== this.props){
      if(this.props.challenge.challengers.includes(Auth.currentUserId())){
        const accepted = true;
        this.setState({ accepted });
      }

    }
  }

  acceptChallenge = (challengeId) => {
      console.log('acceptChallenge fires');
      axios.post(`/api/challenges/${challengeId}`, { id: Auth.currentUserId()});
  }

  handleClick = () => {

    console.log('_onclick fires');
    this.acceptChallenge(this.props.challenge._id);
    const accepted = true;
    this.setState({accepted}, () => console.log('the new state is ', this.state, this.props));
  }

  render(){
    const { challenge } = this.props;
    return(
      <div className="column is-4 challenge card">
        <p className="challenge-title">{challenge.name}</p>
        <p className = "challenge-details">{challenge.challengeGrit} grit points</p>
        <p>{challenge.challengers.length} challengers</p>

        {!this.state.accepted &&
          <p>Accept?
            <button onClick={this.handleClick}>
              <i className="far fa-check-circle"></i>
            </button>
          </p>}
      </div>
    );
  }
}
