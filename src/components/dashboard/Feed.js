import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

class Feed extends React.Component {

  fetchData() {
    this.setState({ exercises: this.props.exercises });
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
                  <Link className="navbar-item" to="/exerciseplan/new">
                    <h4 className="title is-4 white">Create a program</h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="card program-card">
            <div className="card-content">
              <div className="columns is-multiline is-vcentered">
                <div className="column is-1 is-pulled-left">
                  <h3 className="title is-3"><i className="far fa-plus-square fas"></i></h3>
                </div>
                <div className="column is-pulled-left">
                  <Link
                    className="navbar-item"
                    to={ {
                      pathname: `/profile/${Auth.currentUserId()}`,
                      hash: '#history'
                    } }>

                    <h4 className="title is-4 white">View your history</h4>
                  </Link>
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
