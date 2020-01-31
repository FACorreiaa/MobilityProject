import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getRentalData } from '../../actions/adminActions';
import MapContainer from '../Clients/MapContainer';
import { getPlaces } from '../../actions/placeActions';
import { classes } from '../Contants/constants/graph';
import Paper from '@material-ui/core/Paper';

import Navbar from './NavBar';
class MapParkings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0
    };
  }
  componentDidMount() {
    this.props.getRentalData();
    this.props.getPlaces();
  }

  getCoords = () => {
    const firstCenter = this.props.places.places.map(place => {
      return {
        lat: place.center[0],
        lng: place.center[1]
      };
    });
    let coords = { ...firstCenter[0] };
    return coords;
  };

  render() {
    /*     const { user } = this.props.auth;
     */ const { rental } = this.props.rental;

    //teste
    /*  const firstCenter = this.props.places.places.map(place => {
      return {
        lat: place.center[0],
        lng: place.center[1]
      };
    }); */
    /* const firstCenter = this.props.places.places.map(place => {
      return {
        lat: place.center[0],
        lng: place.center[1]
      };
    }); */
    /*     let coords = { ...firstCenter[0] };
     */
    let initialCenter = this.getCoords();

    const style = {
      height: '400px',
      width: '100%'
    };
    const centers = rental.map(r => {
      return {
        lat: r.end.geometry.coordinates[0],
        lng: r.end.geometry.coordinates[1]
      };
    });

    return (
      <div>
        <Navbar />
        <Paper className={classes.paper}>
          <MapContainer
            markerPositions={centers}
            initialCenter={initialCenter}
            style={style}
          />
        </Paper>
      </div>
    );
  }
}
MapParkings.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getRentalData: PropTypes.func.isRequired,
  getPlaces: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  places: state.places,
  rental: state.rental
});
export default connect(mapStateToProps, {
  logoutUser,
  getRentalData,
  getPlaces
})(MapParkings);
