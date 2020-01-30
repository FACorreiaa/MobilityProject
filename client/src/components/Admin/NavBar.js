import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

export class NavBar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    //this.props.history.push('/searchVehicles');
  };

  render() {
    const { user } = this.props.auth;
    console.log('AUTH', this.props.auth);
    return (
      <div>
        {!this.props.auth.isAuthenticated ? (
          <nav style={{ fontFamily: 'monospace' }}>
            <div className='nav-wrapper'>
              <ul id='nav-mobile' className='center hide-on-med-and-down'>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>Register</Link>
                </li>
              </ul>
            </div>
          </nav>
        ) : (
          <nav style={{ fontFamily: 'monospace' }}>
            <div className='nav-wrapper'>
              <ul id='nav-mobile' className='center hide-on-med-and-down'>
                <li>
                  <Link to='/validateUsers'>Validate Users</Link>
                </li>
                <li>
                  <Link to='/checkParkings'>Check Parkings</Link>
                </li>
                <li>
                  <Link to='/marParkings'>Visualize Parkings</Link>
                </li>
                <li>
                  <Link to='/charts'>Dashboard</Link>
                </li>
                <li>
                  <button onClick={this.onLogoutClick}>Logout</button>
                </li>
              </ul>
              <ul className='right'>
                <li>
                  <span style={{ display: 'flex' }}>
                    {' '}
                    <strong>Hey there, {user.username}</strong>
                  </span>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </div>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(NavBar);
