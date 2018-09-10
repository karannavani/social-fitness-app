import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import TribeVsUserChart from './TribeVsUserChart';
import UserGritVsTime from './UserGritVsTime';


class Graphs extends React.Component{
  state = {}

  componentDidMount(){
    axios.get(`/api/users/${Auth.currentUserId()}`)
      .then(res => this.setState({ user: res.data }));
    const paginateOptions = {
      'userId': Auth.currentUserId(),
      'page': 1,
      'sort': {'startDate': -1 },
      'populate': 'user',
      'limit': 2
    };
    axios.post('/api/exerciseplans/paginate', paginateOptions)
      .then(res => console.log('past plans x 2', res.data));
  }

  componentDidUpdate(previousProps) {
    if(this.props.members !== previousProps.members && this.state.user){
      this.setState({ members: this.props.members }, () =>
        this.functionData()
      );
    }
  }

  functionData = () => {
    this.tribeGrit();
    this.userGritHistory();
  }

  tribeGrit = () => {
    const totalGrit = [];
    this.state.members.forEach(member =>
      totalGrit.push(member.grit));
    const totalGritReduced = totalGrit.reduce((a, b) => a + b);
    this.setState({totalGritReduced});
  }

  userGritHistory = () => {
    const user = this.state.user;
    let i = 0;
    const userGritHistory = [];
    for(i = 0; i < 14; i++ ) {
      userGritHistory.push(user.dailyGrit[i].grit);
    }
    this.setState({ userGritHistory });
  }

  // userGritAvailable = () => {
  //
  // }

  render() {
    return (
      <div className="columns is-multiline">
        <div className="column is-half whole-tribe-pie"
          style={{ height: '50vh', width: '50%'}}>
          {this.state.user && this.state.totalGritReduced &&
            <TribeVsUserChart tribeGrit={this.state.totalGritReduced}
              userGrit={this.state.user.grit}/>}
        </div>
        <div className="column is-half" style={{ height: '50vh', width: '50%'}}>
          {this.state.userGritHistory &&
          <UserGritVsTime userGritHistory={this.state.userGritHistory}/>
          }
        </div>
        <div className="column is-half" style={{ height: '50vh', width: '50%'}}>

          <p>Tribe grit available vs achieved</p>
        </div>
        <div className="column is-half" style={{ height: '50vh', width: '50%'}}>
          <p>Time and intensity table</p>

        </div>
      </div>);
  }
}


export default Graphs;
