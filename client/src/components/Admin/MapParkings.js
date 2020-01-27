import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getRentalData } from '../../actions/adminActions';
import { Table, Button, Icon, Checkbox } from 'react-materialize';
import MapContainer from '../Clients/MapContainer';

import Navbar from './NavBar';
class MapParkings extends Component {
  componentDidMount() {
    this.props.getRentalData();
  }

  render() {
    const { user } = this.props.auth;
    const { rental } = this.props.rental;
    console.log(this.props);
    const initialCenter = { lat: 41.53113384600326, lng: -8.619018495082855 };
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
    console.log(centers);
    return (
      <div>
        <Navbar />
        oi
        <MapContainer
          markerPositions={centers}
          initialCenter={initialCenter}
          style={style}
        />
      </div>
    );
  }
}
MapParkings.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getRentalData: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  places: state.places,
  rental: state.rental
});
export default connect(mapStateToProps, {
  logoutUser,
  getRentalData
})(MapParkings);
