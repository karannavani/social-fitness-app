import React from 'react';
import axios from 'axios';
import Request from '../../lib/Request';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';
import { withRouter } from 'react-router-dom';

class ChallengeCard extends React.Component{
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
    axios.post(`/api/challenges/${challengeId}`, { id: Auth.currentUserId()}, Auth.bearerHeader());
  }

  handleClick = () => {

    this.acceptChallenge(this.props.challenge._id);
    const accepted = true;
    this.setState({accepted}, () => console.log('the new state is ', this.state, this.props));
    const feedBody = {
      user: Auth.currentUserId(),
      type: 'createChallenge',
      challengeId: this.props.challenge._id
    };
    Request.updateFeed(feedBody);

    Flash.setMessage('success', 'CHALLENGE ACCEPTED!');
    this.props.history.push(this.props.location.pathname);
  }


  render(){
    const { challenge } = this.props;
    return(
      <div className="column is-3 challenge card">
        <p className="black-title">{challenge.name}</p>
        <p className = "challenge-details black-title">{challenge.challengeGrit} grit points</p>
        <p className="black-title">{challenge.challengers.length} challengers</p>

        {!this.state.accepted &&
          <p className="black-title">Accept?
            <button onClick={this.handleClick}>
              <i className="far fa-check-circle"></i>
            </button>
          </p>}
      </div>
    );
  }
}

export default withRouter(ChallengeCard);
