import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getOccupancy, getCheckinDash } from '../../actions/dashActions';
import Pusher from 'pusher-js';
import { Bar } from 'react-chartjs-2';

Pusher.logToConsole = true;

let channel;

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = { options: [] };
  }

  componentDidMount() {
    this.props.getOccupancy();
    var pusher = new Pusher('da84b590e82a4f23838b', {
      cluster: 'eu',
      forceTLS: true
    });
    channel = pusher.subscribe('occupancy');
    channel.bind('update-places', res => {
      console.log('RES', res);
      this.setState({ options: res.values });

      console.log('statSTATEEEEEEEEEEEEEEEEE' + JSON.stringify(this.state));
    });
  }

  render() {
    const { charts_places } = this.props.charts_places;
    console.log(this.state);
    const { user } = this.props.auth;
    return (
      <div style={{ height: '75vh' }}>
        <div className='row'>
          <div>
            <h4>
              <b style={{ display: 'flex' }}> Hey there, {user.username}</b>
              <p
                style={{ display: 'flex' }}
                className='flow-text grey-text text-darken-1'
              >
                Mobility Charts Dashboard
              </p>
            </h4>
            <br></br>
            <div></div>
          </div>
        </div>
        <div class='container'></div>
        <br></br>
        <div>
          <Bar
            data={{
              labels: ['January', 'February'],
              datasets: [
                {
                  label: 'Rainfall',
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgba(0,0,0,1)',
                  borderWidth: 2,
                  data: this.state.options
                }
              ]
            }}
            options={{
              title: {
                display: true,
                text: 'Average Rainfall per month',
                fontSize: 20
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        </div>
      </div>
    );
  }
}

Charts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  charts_places: PropTypes.object.isRequired,
  getOccupancy: PropTypes.func.isRequired,
  getCheckinDash: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  charts_places: state.charts_places
});
//connect to redux
export default connect(mapStateToProps, {
  logoutUser,
  getOccupancy,
  getCheckinDash
})(Charts);
