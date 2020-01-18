import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getOccupancy } from '../../actions/dashActions';
import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Charts extends Component {
  componentWillMount() {
    this.props.getOccupancy();
  }

  render() {

    const { charts_places } = this.props.charts_places;
    console.log(charts_places);
   // console.log(charts_places[0].street)

    

      var datapointsArray =  [
        { label: '',  y: 10  },
        { label: "Orange", y: 15  },
        { label: "Banana", y: 25  },
        { label: "Mango",  y: 30  },
        { label: "Grape",  y: 28  }
      ];
   
    const options = {
      title: {
        text: "Basic Column Chart in React"
      },
      data: [{				
          type: "column",
          dataPoints: datapointsArray
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
        </div>
     </div>
    );
  }
}


Charts.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getOccupancy: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  charts_places: state.charts_places
});
//connect to redux
export default connect(mapStateToProps, { logoutUser,getOccupancy })(Charts);
