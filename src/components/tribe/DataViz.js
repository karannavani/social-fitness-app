import React from 'react';
import TribeVsUserChart from './TribeVsUserChart';

class Graphs extends React.Component{
  state = {}

  componentDidUpdate(previousProps) {
    if(this.props.user !== previousProps.user){
      console.log('State on arrival', this.props.members);
      this.setState({ members: this.props.members, user: this.props.user });
    }
  }

  tribeGrit = () => {
    const totalGrit = [];
    this.props.members.forEach(member =>
      totalGrit.push(member.grit));
    return totalGrit.reduce((a, b) => a + b);
  }

  render() {
    return (
      <div className="columns is-multiline">
        <div className="column is-half whole-tribe-pie"
          style={{ border: '1px solid black', height: '50vh', width: '50%'}}>
          {this.state.user &&
            <TribeVsUserChart tribeGrit={this.tribeGrit()}
              userGrit={this.state.user.grit}/>}
        </div>
        <div className="column is-half" style={{ border: '1px solid black', height: '50vh', width: '50%'}}>
          <p>User grit vs time since joining</p>
        </div>
        <div className="column is-half" style={{ border: '1px solid black', height: '50vh', width: '50%'}}>

          <p>Tribe grit available vs achieved</p>
        </div>
        <div className="column is-half" style={{ border: '1px solid black', height: '50vh', width: '50%'}}>
          <p>Time and intensity table</p>
          
        </div>
      </div>);
  }
}


export default Graphs;
