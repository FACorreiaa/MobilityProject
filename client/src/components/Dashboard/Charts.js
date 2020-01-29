import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getOccupancy, getCheckinDash } from '../../actions/dashActions';
import Pusher from 'pusher-js';
import { Bar, Line } from 'react-chartjs-2';
import { classes } from '../Contants/constants/graph';
import { typo } from '../Contants/constants/typo';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Navbar from '../Admin/NavBar';
//Pusher.logToConsole = true;

let channel;

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
    channel = pusher.subscribe('occupancy');
    channel.bind('update-places', res => {
      console.log('RES', res);
      this.setState({
        barValues: res.data,
        barLabels: res.labels
      });
    });
  }

  render() {
    console.log('this.props = ' + JSON.stringify(this.props));
    const { user } = this.props.auth;
    return (
      <>
        <div className={classes.root}>
          <Navbar />
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
                    this.state.barValues === ''
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
    /* <div style={{ height: '75vh' }}>
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
        <div className='container'></div>
        <br></br>
        <div>
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
          <Line
          data={
            this.state.barValues === ''
              ? {
                labels: this.props.charts_checkin.charts_checkin.labels,
                datasets: [
                  {
                    label: 'Number of checkins',
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: this.props.charts_checkin.charts_checkin.data
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
            title:{
              display:true,
              text:'Number of checkins by day',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        </div>
      </div> */
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
