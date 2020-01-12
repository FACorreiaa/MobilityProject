import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getPlaces } from '../../actions/placeActions';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Polygon } from '@react-google-maps/api';

class Places extends Component {
  componentWillMount() {
    this.props.getPlaces();
  }

  render() {
    const { user } = this.props.auth;

    const mapContainerStyle = {
      height: '400px',
      width: '800px'
    };

    /* const center = { lat: 41.53113384600326, lng: -8.619018495082855 }; */
    const center = { lat: 36.10237644873644, lng: -11.074218749999998 };

    /* const paths = [
      { lat: 41.53113384600326, lng: -8.619018495082855 },
      { lat: 41.53113384600326, lng: -8.61851692199707 },
      { lat: 41.53129447698251, lng: -8.61851692199707 },
      { lat: 41.53129447698251, lng: -8.619018495082855 },
      { lat: 41.53113384600326, lng: -8.619018495082855 }
    ]; */

    const paths = [
      { lat: 36.10237644873644, lng: 36.10237644873644 },
      { lat: 36.10237644873644, lng: 3.427734375 },
      { lat: 44.11914151643737, lng: 3.427734375 },
      { lat: 44.11914151643737, lng: -11.074218749999998 },
      { lat: 36.10237644873644, lng: -11.074218749999998 }
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

    const onLoad = polygon => {
      console.log('polygon: ', polygon);
    };
    console.log(this.props.places);
    const placeItems = this.props.places.places.map(place => (
      <div key={place.id}>
        <div>
          {place.location.coordinates.map(c => (
            <>
              <b>Coordinates</b>
              <p>
                <span>
                  <b>lat:&nbsp;</b>
                  {c[0][0]},
                </span>
                <span>
                  <b>&nbsp;lon:&nbsp;</b>
                  {c[0][1]}
                </span>
              </p>
              <p>
                <span>
                  <b>lat:&nbsp;</b>
                  {c[1][0]},
                </span>
                <span>
                  <b>&nbsp;lon:&nbsp;</b>
                  {c[1][1]}
                </span>
              </p>
              <p>
                <span>
                  <b>lat:&nbsp;</b>
                  {c[2][0]},
                </span>
                <span>
                  <b>&nbsp;lon:&nbsp;</b>
                  {c[2][1]}
                </span>
              </p>
              <p>
                <span>
                  <b>lat:&nbsp;</b>
                  {c[3][0]},
                </span>
                <span>
                  <b>&nbsp;lon:&nbsp;</b>
                  {c[3][1]}
                </span>
              </p>
              <p>
                <span>
                  <b>lat:&nbsp;</b>
                  {c[4][0]},
                </span>
                <span>
                  <b>&nbsp;lon:&nbsp;</b>
                  {c[4][1]}
                </span>
              </p>
            </>
          ))}
        </div>
      </div>
    ));
    return (
      <div style={{ height: '75vh' }} className='container valign-wrapper'>
        <div className='row'>
          <div className='col s12 center-align'>
            <h4>
              <b>Hey there,</b>{' '}
              {Object.entries(user).length === 0 && user.constructor === Object
                ? 'Guest'
                : user.username}
              <p className='flow-text grey-text text-darken-1'>
                You are logged into a full-stack{' '}
                <span style={{ fontFamily: 'monospace' }}>MERN</span> app 👏
              </p>
              <b>Check our places</b>
              <p>Or Register here to have full access</p>
            </h4>
            <LoadScript
              id='script-loader'
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
            >
              <GoogleMap
                id='circle-example'
                mapContainerStyle={mapContainerStyle}
                zoom={5}
                center={center}
              />

              <Polygon onLoad={onLoad} paths={paths} options={options} />
            </LoadScript>
            <div>{placeItems}</div>
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
