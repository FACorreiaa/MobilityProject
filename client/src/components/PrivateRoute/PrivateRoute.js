import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const PrivateRoute = ({
  component: Component,
  userRoles = [],
  roles = [],
  auth,
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
        auth.isAuthenticated === true && hasRole ? (
          <Component {...props} />
        ) : (
          <Redirect to='/searchVehicles' />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userRoles: state.auth.user.role,
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);
