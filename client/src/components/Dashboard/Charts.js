import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getOccupancy, getCheckinDash } from '../../actions/dashActions';
import Pusher from 'pusher-js';
import { Bar, Line } from 'react-chartjs-2';
import { classes } from '../Contants/constants/graph';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navbar from '../Admin/NavBar';
//Pusher.logToConsole = true;

let occupancyChannel;
let checkinChannel;

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barValues: '',
      barLabels: '',
      lineValues: '',
      lineLabels: ''
    };
  }

  componentDidMount() {
    this.props.getOccupancy();
    this.props.getCheckinDash();

    var pusher = new Pusher('da84b590e82a4f23838b', {
      cluster: 'eu',
      forceTLS: true
    });
    occupancyChannel = pusher.subscribe('occupancy');
    occupancyChannel.bind('update-places', res => {
      this.setState({
        barValues: res.datapointsArray.data,
        barLabels: res.datapointsArray.labels
      });
    });

    checkinChannel = pusher.subscribe('checkinByDay');
    checkinChannel.bind('update-rentals', res => {
      this.setState({
        lineValues: res.datapointsArray.data,
        lineLabels: res.datapointsArray.labels
      });
    });
  }

  render() {
    return (
      <>
        <div className={classes.root}>
          <Navbar />
          <br />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Bar
                  data={
                    this.state.barValues === ''
                      ? {
                          labels: this.props.charts_places.charts_places.labels,
                          datasets: [
                            {
                              label: '% Occupancy tax',
                              backgroundColor: 'rgb(255, 0, 0)',
                              borderColor: 'rgba(0,0,0,1)',
                              borderWidth: 2,
                              data: this.props.charts_places.charts_places.data
                            }
                          ]
                        }
                      : {
                          labels: this.state.barLabels,
                          datasets: [
                            {
                              label: '% Occupancy tax',
                              backgroundColor: 'rgb(255, 0, 0)',
                              borderColor: 'rgba(0,0,0,1)',
                              borderWidth: 2,
                              data: this.state.barValues
                            }
                          ]
                        }
                  }
                  options={{
                    title: {
                      display: true,
                      text: 'Places occupancy percentage (%)',
                      fontSize: 20
                    },
                    legend: {
                      display: true,
                      position: 'right'
                    }
                  }}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Line
                  data={
                    this.state.lineValues === ''
                      ? {
                          labels: this.props.charts_checkin.charts_checkin
                            .labels,
                          datasets: [
                            {
                              label: 'Number of checkins',
                              backgroundColor: 'rgba(75,192,192,1)',
                              borderColor: 'rgba(0,0,0,1)',
                              borderWidth: 2,
                              data: this.props.charts_checkin.charts_checkin
                                .data
                            }
                          ]
                        }
                      : {
                          labels: this.state.lineLabels,
                          datasets: [
                            {
                              label: 'Number of checkins',
                              backgroundColor: 'rgba(75,192,192,1)',
                              borderColor: 'rgba(0,0,0,1)',
                              borderWidth: 2,
                              data: this.state.lineValues
                            }
                          ]
                        }
                  }
                  options={{
                    title: {
                      display: true,
                      text: 'Number of checkins by day',
                      fontSize: 20
                    },
                    legend: {
                      display: true,
                      position: 'right'
                    }
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

Charts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  charts_places: PropTypes.object.isRequired,
  charts_checkin: PropTypes.object.isRequired,
  getOccupancy: PropTypes.func.isRequired,
  getCheckinDash: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  charts_places: state.charts_places,
  charts_checkin: state.charts_checkin
});
//connect to redux
export default connect(mapStateToProps, {
  logoutUser,
  getOccupancy,
  getCheckinDash
})(Charts);
