import React from 'react';
import { Link } from 'react-router-dom';

class Feed extends React.Component {
  state = {
    render: false,
    dotsArr: []
  }

  componentDidMount() {
    this.setState({ exercises: this.props.exercises }, () => {
      // console.log('feed looks like', this.state.exercises);
      this.createDots();
    });

  }

  parentUpdate = () => {
    console.log('feed called');
    this.setState({ exercises: this.props.exercises, dotsArr: [] }, () => {
      this.createDots();
    });
  }

  createDots = () => {
    for (let i = 1; i < 8; i++) {
      switch(this.props.exercises[`day${i}`].exerciseCompleted) {
        case (null):
          console.log('grey');
          this.state.dotsArr.push('grey');
          break;
        case (true):
          console.log('green');
          this.state.dotsArr.push('green');
          break;
        case (false):
          console.log('red');
          this.state.dotsArr.push('red');
          break;
      }
      if (i === 7) this.forceUpdate();
    }
  }

  render() {
    const {dotsArr} = this.state;
    return(
      <div className="column is-10 container" style={{ height: '100vh', overflow: 'auto'}}>
        <div className="dashFeed">
          <div className="card program-card">
            <div className="card-content">
              <div className="columns is-multiline is-vcentered">
                <div className="column is-1 is-pulled-left">
                  <h3 className="title is-3"><i className="far fa-plus-square fas"></i></h3>
                </div>
                <div className="column is-pulled-left">
                  <Link className="navbar-item" to="/exerciseplan/new">
                    <h4 className="title is-4 white">Create a program</h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="card program-card-unlogged">
            <div className="card-content">
              <h4 className="title is-4 white">This week</h4>
              { dotsArr.length === 7 && dotsArr.map((dot, i) =>

                <i className={`fas fa-circle dot-${dotsArr[i]}`} key={i}></i>
              )

              }
            </div>
          </div>



        </div>
      </div>

    );
  }
}

export default Feed;
