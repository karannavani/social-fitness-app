import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';

class Header extends React.Component {

  handleLogout = () => {
    Auth.removeToken();
    this.props.history.push('/');
  }

  render() {
    return(
      <header >
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
          <div className="container">

            <div className="navbar-brand">
              <Link className="navbar-item" to="/tribe"><img src="../assets/GRIT-logo.png" alt="logo" /></Link>

              <a role="button" className="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
                <span className="burger-menu"></span>
                <span className="burger-menu"></span>
                <span className="burger-menu"></span>
              </a>
            </div>

            <div className="navbar-menu">
              <div className="navbar-end">
                {Auth.isAuthenticated() && <Link className="navbar-item" to="/dashboard">Dashboard</Link>}
                {Auth.isAuthenticated() && <Link className="navbar-item" to="/exerciseplan/new">Create a plan</Link>}
                {Auth.isAuthenticated() && <Link className="navbar-item" to={`/profile/${Auth.currentUserId()}`}>Profile</Link>}
                {Auth.isAuthenticated() && <Link className="navbar-item" to={`/tribe/${Auth.currentUserTribe()}`}>Tribe</Link> }
                <Link className="navbar-item" to="/tribe">All Tribes</Link>
                {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Log In</Link>}
                {Auth.isAuthenticated() &&
                  <a onClick={ this.handleLogout } className="navbar-item" >Log Out</a>}
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
