import React from 'react';
import { Link } from 'react-router-dom';

export default class SimpleDash extends React.Component {
  state = {}

  render() {
    return(
      <div className="column is-10 container" style={{ height: '100vh', overflow: 'auto'}}>
        <div className="card program-card">
          <div className="card-content">
            <div className="columns is-multiline is-vcentered">
              <div className="column is-2">
                <h3 className="title is-3"><i className="far fa-plus-square fas"></i></h3>
              </div>
              <div className="column is-4">
                <Link className="navbar-item" to="/exerciseplan/new">
                  <h4 className="title is-4 white">Create a program</h4>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
