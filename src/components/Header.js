import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';

class Header extends React.Component {
  handleLogout = () => {
    Auth.removeToken();
    this.props.history.push('/login');
  }
  render() {
    return(
      <header className="navbar">
        <Link className="navbar-item" to="/dashboard">Dashboard</Link>
        <Link className="navbar-item" to="/profile">Profile</Link>
        <Link className="navbar-item" to="/tribe/:tribeName">Tribe</Link>
      </header>
    );
  }
}

export default withRouter(Header);
