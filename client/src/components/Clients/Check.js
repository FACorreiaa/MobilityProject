import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getPlaces } from '../../actions/placeActions';
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
  Polygon,
  Marker
} from '@react-google-maps/api';
import pinIcon from '../../assets/pin.svg';
import ClientNav from './ClientNav';

class SearchVehicles extends Component {
  UNSAFE_componentWillMount() {
    this.props.getPlaces();
  }

  render() {
    console.log(this.props);

    const { user } = this.props.auth;
    const { places } = this.props.clients;

    const center = { lat: 41.53113384600326, lng: -8.619018495082855 };
    /*     const center = { lat: 36.10237644873644, lng: -11.074218749999998 };
     */
    const paths = [
      { lat: 41.53113384600326, lng: -8.619018495082855 },
      { lat: 41.53113384600326, lng: -8.61851692199707 },
      { lat: 41.53129447698251, lng: -8.61851692199707 },
      { lat: 41.53129447698251, lng: -8.619018495082855 },
      { lat: 41.53113384600326, lng: -8.619018495082855 }
    ];

    const options = {
      fillColor: 'lightblue',
      fillOpacity: 1,
      strokeColor: 'red',
      strokeOpacity: 1,
      strokeWeight: 2,
      clickable: true,
      draggable: false,
      editable: false,
      geodesic: false,
      zIndex: 1
    };

    const onLoad = ref => (this.searchBox = ref);

    const onPlacesChanged = () => console.log(this.searchBox.getPlaces());

    const arr = [];
    const examples = places.map(p => {
      return p.location.coordinates.forEach(element => {
        element.forEach(e => {
          arr.push(e);
        });
      });
    });
    console.log('arr', arr);

    console.log(this.props.places);
    const placeItems = this.props.clients.places.map(place => (
      <div key={place.id}>
        <div className='row center-align'>
          <div className='col'>
            <p>
              <b>Capacity: </b>
              <span>{place.capacity}</span>
            </p>
          </div>
          <div className='col'>
            <p>
              <b>Quantity: </b>
              <span>{place.quantity}</span>
            </p>
          </div>
          <div className='col'>
            <p>
              <b>Postal Code: </b>
              <span>{place.cp}</span>
            </p>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <MapContainer
          initialCenter={initialCenter}
          position={position}
          paths={paths}
          style={style}
          center={center}
        />
        <div>{placeItems}</div>
      </div>
    );
  }
}
SearchVehicles.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getPlaces: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  places: state.places,
  clients: state.clients
});
export default connect(mapStateToProps, { logoutUser, getPlaces })(
  SearchVehicles
);
