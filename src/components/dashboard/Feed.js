import React from 'react';

class Feed extends React.Component {

  componentDidMount() {
    this.setState({ exerciseData: this.props.exerciseData }, () => console.log('feed', this.state.exerciseData));
  }

  render() {
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
                  <h4 className="title is-4 white">Create a program</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Feed;
