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
      .then(res => this.setState({ userAvailableGrit: res.data.docs }, () => {
        console.log('1st state: userAvailableGrit is', res.data.docs);
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
    for( i = 0; i < 14; i++ ) {
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
    this.setState({ userAvailableGrit: chartAvailableGrit }, () => {
      console.log('2nd state: userAvailableGrit is', chartAvailableGrit);
    });
  }

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
          <UserGritVsTime userGritHistory={this.state.userGritHistory} userAvailableGrit={this.state.userAvailableGrit}/>
          }
        </div>
        <div className="column is-half" style={{ height: '50vh', width: '50%'}}>

          <p>Tribe grit available vs achieved</p>
        </div>
        <div className="column is-half" style={{ height: '50vh', width: '50%'}}>
          <p>Time and intensity table</p>

        </div>
      </div>
    );
  }
}


export default Graphs;
