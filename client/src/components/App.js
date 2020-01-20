import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authActions';
import { Provider } from 'react-redux';
import store from '../store';
import Navbar from '../components/Navbar/Navbar';
import Landing from '../components/Landing/Landing';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import Dashboard from '../components/Dashboard/Dashboard';
import Charts from '../components/Dashboard/Charts';
import Places from '../components/Places/Places';
import Clients from '../components/Clients/Clients';
import SearchVehicles from '../components/Clients/SearchVehicles';
import Profile from '../components/Clients/Profile';
import Balance from '../components/Clients/Balance';
import CheckIn from '../components/Clients/Checkin';


// Check for token to keep user logged in
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
    window.location.href = './login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/places' component={Places} />
            <Route exact path='/charts' component={Charts} />
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/main' component={Clients} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute exact path='/balance' component={Balance} />
              <PrivateRoute exact path='/checkin' component={CheckIn} />
              <PrivateRoute
                exact
                path='/searchVehicles'
                component={SearchVehicles}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
