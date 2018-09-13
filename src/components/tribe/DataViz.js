import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import TribeVsUserChart from './TribeVsUserChart';
import UserGritVsTime from './UserGritVsTime';
import ChallengesIndex from '../challenges/Index';


class Graphs extends React.Component{
  state = {}

  componentDidMount(){
    axios.get(`/api/users/${Auth.currentUserId()}`, Auth.bearerHeader())
      .then(res => this.setState({ user: res.data }));

    const paginateOptions = {
      'userId': Auth.currentUserId(),
      'page': 1,
      'sort': {'startDate': -1 },
      'populate': 'user',
      'limit': 2
    };
    axios.post('/api/exerciseplans/paginate', paginateOptions, Auth.bearerHeader())
      .then(res => this.setState({ userAvailableGrit: res.data.docs }, () => {
        this.userAvailableGrit();
      }
      ));
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
    let stopCondition = 14;
    if(user.dailyGrit.length <= 14 ){
      stopCondition = user.dailyGrit.length;
    }

    for( i = 0; i < stopCondition; i++ ) {
      if(user.dailyGrit.length){
        userGritHistory.push(user.dailyGrit[i].grit);
      }
    }
    return this.incrementerV3(userGritHistory);
  }

  incrementerV3 = (inputArr) => {
    const resultArr = [];
    const reduceSum = inputArr.reduce((sum, item, index ) => {
      if(index > 0){
        resultArr.push(sum);
      }
      return sum +  item;
    }, 0);

    resultArr.push(reduceSum);
    this.setState({ userGritHistory: resultArr});
  }

  userAvailableGrit = () => {
    const userAvailableGrit = this.state.userAvailableGrit;
    const chartAvailableGrit = [];
    if (userAvailableGrit.length > 0) {
      for(let i = 0; i < userAvailableGrit.length; i++ ) {
        chartAvailableGrit.push(userAvailableGrit[i].totalAvailableGrit);
      }
    }
    this.setState({ userAvailableGrit: chartAvailableGrit });
  }

  render() {
    return (
      <div className="columns is-multiline">
        <div className="column is-half whole-tribe-pie"
          style={{ height: '50vh', width: '50%'}}>
          {this.state.user && this.state.totalGritReduced &&
            <TribeVsUserChart tribeGrit={this.state.totalGritReduced}
              userGrit={this.state.user.grit}
            />}
        </div>
        <div className="column is-half user-grit-vs-time" style={{ height: '50vh', width: '50%'}}>
          {this.state.userGritHistory &&
          <UserGritVsTime userGritHistory={this.state.userGritHistory} />
          }
        </div>
        <div className="column challenges-index" style={{ height: '50vh', width: '50%'}}>
          <p className="title is-12 page-title-large">Challenges</p>
          <ChallengesIndex />

        </div>
      </div>
    );
  }
}


export default Graphs;
