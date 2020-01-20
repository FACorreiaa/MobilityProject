import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getOccupancy,getCheckinDash } from '../../actions/dashActions';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

class Charts extends Component {
  componentWillMount() {
    this.props.getOccupancy();
    this.props.getCheckinDash();
  }

  render() {

    const { charts_places } = this.props.charts_places;
    const { charts_checkin } = this.props.charts_checkin;
    
    var datapointsArray = [];
    var i;
    for (i = 0; i < charts_places.length; i++) {
      var place = charts_places[i];
      var street = place.street;
      var occupancy = place.occupancy;
      var datapoint = {label: street,  y: occupancy};
      //console.log(datapoint);
      datapointsArray.push(datapoint);
    }
    
    const options = {
      title: {
        text: "Occupancy tax"
      },
      data: [{				
          type: "column",
          dataPoints: datapointsArray
       }]
   }


   /** CHECKIN COUNTING CHART */

   console.log(charts_checkin);
   var datapointsArray = [];
    var i;
    for (i = 0; i < charts_checkin.length; i++) {
      var checkin = charts_checkin[i];
      var checkinDt = checkin._id;
      var count = checkin.count;
      var datapoint = {x: new Date(checkinDt),  y: count};
      console.log(datapoint);
      datapointsArray.push(datapoint);
    }

   const options2 = {
    animationEnabled: true,
    theme: "light2",
    title:{
      text: "Number of checkins overtime"
    },
    axisX:{
      valueFormatString: "DD MMM",
      crosshair: {
        enabled: true,
        snapToDataPoint: true
      }
    },
    axisY: {
      title: "Checkin count overtime",
      includeZero: true,
      valueFormatString: "##0",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
        labelFormatter: function(e) {
          return CanvasJS.formatNumber(e.value, "##0");
        }
      }
    },
    data: [{
      type: "area",
      xValueFormatString: "DD MMM",
      yValueFormatString: "##0",
      dataPoints: 
      datapointsArray 
      /*[
        { x: new Date("2018-03-01"), y: 1},
        { x: new Date("2018-03-02"), y: 2}
        { x: new Date("2018-03-05"), y: 83.49},
        { x: new Date("2018-03-06"), y: 84.16},
        { x: new Date("2018-03-07"), y: 84.86},
        { x: new Date("2018-03-08"), y: 84.97},
        { x: new Date("2018-03-09"), y: 85.13},
        { x: new Date("2018-03-12"), y: 85.71},
        { x: new Date("2018-03-13"), y: 84.63},
        { x: new Date("2018-03-14"), y: 84.17},
        { x: new Date("2018-03-15"), y: 85.12},
        { x: new Date("2018-03-16"), y: 85.86},
        { x: new Date("2018-03-19"), y: 85.17},
        { x: new Date("2018-03-20"), y: 85.99},
        { x: new Date("2018-03-21"), y: 86.1},
        { x: new Date("2018-03-22"), y: 85.33},
        { x: new Date("2018-03-23"), y: 84.18},
        { x: new Date("2018-03-26"), y: 85.21},
        { x: new Date("2018-03-27"), y: 85.81},
        { x: new Date("2018-03-28"), y: 85.56},
        { x: new Date("2018-03-29"), y: 88.15}
      ]*/
    }]
  }

    const { user } = this.props.auth;
    return (
      <div style={{ height: '75vh' }}>
        <div className='row'>
          <div >
            <h4>
              <b style={{ display: 'flex' }} > Hey there, {user.username}</b> 
              <p style={{ display: 'flex' }} className='flow-text grey-text text-darken-1'>
                Mobility Charts Dashboard
              </p>
            </h4>
            <br></br>
            <div>
          </div>
          </div>
        </div>
        <div class="container">
        </div>
        <br></br>
        <h1>OS Vote</h1>
        <p>Vote for your favorite OS to develop on</p>
        <form id="vote-form">
          <p>
            <label>
                <input type="radio" name="os" id="windows" value="Windows"/>
                <span for="windows">Windows</span>
            </label>
          </p>
            <label>
                <input type="radio" name="os" id="macos" value="MacOS"/>
                <span for="macos">MacOS</span>
            </label>
          <p>
            <label>
                <input type="radio" name="os" id="linux" value="Linux"/>
                <span for="linux">Linux Distro</span>
            </label>
          </p>
          <p>
            <label>
                <input type="radio" name="os" id="other" value="Other"/>
                <span for="other">Something else</span>
            </label>
          </p>
          <input type="submit" value="Vote" class="btn"/>
        </form>
        <h5 id="chartTitle">Chart</h5>
        <div>
        <CanvasJSChart options = {options}
           // onRef = {ref => this.chart = ref} 
        />
        <CanvasJSChart options = {options2}
           // onRef = {ref => this.chart = ref} 
        />
        </div>
     </div>
    );
  }
}


Charts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getOccupancy: PropTypes.func.isRequired,
  getCheckinDash: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  charts_places: state.charts_places,
  charts_checkin: state.charts_checkin
});
//connect to redux
export default connect(mapStateToProps, { logoutUser,getOccupancy, getCheckinDash })(Charts);
