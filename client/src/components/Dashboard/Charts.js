import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getOccupancy,getCheckinDash } from '../../actions/dashActions';
import CanvasJSReact from '../../assets/canvasjs.react';
import Pusher from 'pusher-js';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var CanvasJS = CanvasJSReact.CanvasJS;

Pusher.logToConsole = true;
var options = {};
var channel;
var atualizado = [];

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {dataPoints: this.props.charts_places};
  }

 
  //componentWillMount() {
    componentDidMount(){
    const { user } = this.props.auth;
    
    var pusher = new Pusher('da84b590e82a4f23838b', {
      cluster: 'eu',
      forceTLS: true
    });
    console.log('aqui' );
    this.props.getOccupancy();
    this.props.getCheckinDash();

    /*const channel = pusher.subscribe('client-occupancy');
    channel.bind('places', this.props.charts_places);*/

     channel = pusher.subscribe('my-channel');
     channel.bind('my-event', function(data) {
      alert(JSON.stringify(data.datapointsArray));
      console.log('1- '+JSON.stringify(data.datapointsArray));
      atualizado = data.datapointsArray;
      
      console.log('1 atualizado- '+JSON.stringify(atualizado));

      /*this.setState({
        dataPoints: atualizado
      });*/

      this.setState({
        dataPoints: new Date()
      });
    }).bind(this);
    

  }
 
  

 

  render() {

    const { charts_places } = this.props.charts_places;
    const { charts_checkin } = this.props.charts_checkin;
   
   console.log('2-'+JSON.stringify(atualizado));
   
    
   options = {
    title: {
      text: "Occupancy tax"
    },
    data: [{				
        type: "column",
        dataPoints: charts_places
     }]
 }

 


   /** CHECKIN COUNTING CHART */

   var datapointsArray = [];
    var i;
    for (i = 0; i < charts_checkin.length; i++) {
      var checkin = charts_checkin[i];
      var checkinDt = checkin._id;
      var count = checkin.count;
      var datapoint = {x: new Date(checkinDt),  y: count};
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
        <h5 id="chartTitle">Chart</h5>
        <div>
        <CanvasJSChart options = {options}
            onRef = {ref => this.chart = ref} 
        />
        <CanvasJSChart options = {options2}
            onRef = {ref => this.chart = ref} 
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
