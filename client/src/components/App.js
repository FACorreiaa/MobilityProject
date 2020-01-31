import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authActions';
import { Provider } from 'react-redux';
import store from '../store';
import Navbar from '../components/Navbar/Navbar';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Charts from '../components/Dashboard/Charts';
import Places from '../components/Places/Places';
import Clients from '../components/Clients/Clients';
import SearchVehicles from '../components/Clients/SearchVehicles';
import Profile from '../components/Clients/Profile';
import Balance from '../components/Clients/Balance';
import CheckIn from '../components/Clients/Checkin';
import Checkout from '../components/Clients/Checkout';
import ValidateUsers from './Admin/ValidateUsers';
import CheckParkingData from './Admin/CheckParkingData';
import MapParkings from './Admin/MapParkings';
import NotifyUsers from './Func/NotifyUsers';
import routesConfig from './PrivateRoute/routesConfig';

if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = './searchVehicles';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            {console.log(routesConfig)}
            <Navbar />

            <Switch>
              {routesConfig.routes.map(({ component, roles, url }) =>
                roles.length ? (
                  <PrivateRoute
                    exact
                    path={url}
                    component={component}
                    roles={roles}
                  />
                ) : (
                  <Route exact path={url} component={component} />
                )
              )}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
