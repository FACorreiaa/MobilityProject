import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const PrivateRoute = ({
  component: Component,
  userRoles = [],
  roles = [],
  ...rest
}) => {
  // check the route's roles to see if any match a role the user has
  const hasRole = roles.some(role => userRoles.includes(role));
  {
    console.log('ROLES' + userRoles);
  }

  return (
    <Route
      {...rest}
      render={props =>
        hasRole ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

const mapStateToProps = state => ({
  userRoles: state.auth.user.role
});
export default connect(mapStateToProps)(PrivateRoute);
