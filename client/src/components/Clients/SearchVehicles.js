import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getPlaces } from '../../actions/placeActions';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import ClientNav from './ClientNav';
import MapContainer from './MapContainer';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
class SearchVehicles extends Component {
  componentWillMount() {
    this.props.getPlaces();
  }

  constructor(props) {
    super(props);
    this.state = { address: '', lat: '', lng: '', value: '' };
  }

  handleChange = (address, lat, lng) => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ lat: latLng.lat, lng: latLng.lng });
        console.log('Success', latLng);
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    console.log(this.state);
    const style = {
      height: '400px',
      width: '800px'
    };
    const initialCenter = { lat: 41.53113384600326, lng: -8.619018495082855 };
    const position = { lat: 41.53113384600326, lng: -8.619018495082855 };
    const paths = [
      { lat: 41.53113384600326, lng: -8.619018495082855 },
      { lat: 41.53113384600326, lng: -8.61851692199707 },
      { lat: 41.53129447698251, lng: -8.61851692199707 },
      { lat: 41.53129447698251, lng: -8.619018495082855 },
      { lat: 41.53113384600326, lng: -8.619018495082855 }
    ];
    let lat = this.state.lat;
    let lng = this.state.lng;
    let center = {};

    if (this.state.lat !== '' && this.state.lng !== '') {
      center = { lat, lng };
    }

    return (
      <div>
        <ClientNav />
        <div style={{ textAlign: 'center' }}>
          <h4>Search for Vehicles</h4>
          <p className='flow-text grey-text text-darken-1'>
            Input the name of the street
          </p>
        </div>
        <div className='container valign-wrapper'>
          <div className='row center-align s12'>
            <div className='col'>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input'
                      })}
                    />
                    <div className='autocomplete-dropdown-container'>
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
          </div>
        </div>
        <MapContainer
          initialCenter={initialCenter}
          position={position}
          paths={paths}
          style={style}
          center={center}
        />
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
