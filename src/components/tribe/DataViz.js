import React from 'react';
import TribeVsUserChart from './TribeVsUserChart';
import axios from 'axios';
import Auth from '../../lib/Auth';


class Graphs extends React.Component{
  state = {}

  componentDidMount(){
    axios.get(`/api/users/${Auth.currentUserId()}`)
      .then(res => this.setState({ user: res.data }));
  }

  componentDidUpdate(previousProps) {
    if(this.props.members !== previousProps.members){
      console.log('State on arrival', this.props.members);
      this.setState({ members: this.props.members }, () =>
        this.tribeGrit()
      );
    }
  }

  tribeGrit = () => {
    console.log('member is', this.state.members);
    const totalGrit = [];
    this.state.members.forEach(member =>
      totalGrit.push(member.grit));
    const totalGritReduced = totalGrit.reduce((a, b) => a + b);
    this.setState({totalGritReduced});
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
          <p>User grit vs time since joining</p>
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
