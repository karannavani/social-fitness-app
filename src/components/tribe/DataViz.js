import React from 'react';


class Graphs extends React.Component{
  state = {}

  componentDidUpdate(previousProps) {
    if(this.props.members !== previousProps.members){
      console.log('State on arrival', this.props);
      this.setState({ members: this.props.members });
      console.log('state after setting members', this.state.members);
    }
  }




  render() {
    return (
      <div className="columns is-multiline">
        <div className="column is-half whole-tribe-pie" style={{ border: '1px solid black', height: '50vh', width: '50%'}}>
          <p>Whole tribe pie</p>

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
