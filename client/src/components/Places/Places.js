import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getPlaces } from '../../actions/placeActions';
import MapContainer from '../MapAux/MapContainer';
import Navbar from './Navbar';

class Places extends Component {
  componentDidMount() {
    this.props.getPlaces();
  }

  render() {
    const { user } = this.props.auth;
    const center = { lat: 41.53113384600326, lng: -8.619018495082855 };
    const position = { lat: 41.53113384600326, lng: -8.619018495082855 };
    const paths = [
      { lat: 41.53113384600326, lng: -8.619018495082855 },
      { lat: 41.53113384600326, lng: -8.61851692199707 },
      { lat: 41.53129447698251, lng: -8.61851692199707 },
      { lat: 41.53129447698251, lng: -8.619018495082855 },
      { lat: 41.53113384600326, lng: -8.619018495082855 }
    ];
    const style = {
      height: '400px',
      width: '100%'
    };
    const placeItems = this.props.places.places.map(place => (
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
        <Navbar />
        <div className='row'>
          <div className='col s12 center-align'>
            <h4>
              <b>Hey there,</b>{' '}
              {Object.entries(user).length === 0 && user.constructor === Object
                ? 'Guest'
                : user.username}
              <p className='flow-text grey-text text-darken-1'>
                <span style={{ fontFamily: 'monospace' }}>MOBILITY CITY</span> app 👏
              </p>
              <b>Check our places</b>
              <p>Or Register here to have full access</p>
            </h4>
            <div>{placeItems}</div>
            <MapContainer
              center={center}
              position={position}
              paths={paths}
              style={style}
            />
          </div>
        </div>
      </div>
    );
  }
}
Places.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getPlaces: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  places: state.places
});
export default connect(mapStateToProps, { logoutUser, getPlaces })(Places);
