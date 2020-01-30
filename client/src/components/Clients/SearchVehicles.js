import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getPlaces } from '../../actions/placeActions';
import { Navbar, NavItem, Icon } from 'react-materialize';
import { Map, InfoWindow, GoogleApiWrapper, Marker } from 'google-maps-react';

import ClientNav from './ClientNav';
import MapContainer from './MapContainer';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
class SearchVehicles extends Component {
  componentDidMount() {
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
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ lat: latLng.lat, lng: latLng.lng });
        console.log(this.state);
      })
      .catch(error => console.error('Error', error));
  };

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
    console.log(this.state);
    const style = {
      height: '400px',
      width: '100%'
    };

    // center
    const firstCenter = this.props.places.places.map(place => {
      return {
        lat: place.center[0],
        lng: place.center[1]
      };
    });

    const initialCenter = this.getCoords();
    //marker
    const centers = this.props.places.places.map(place => {
      return {
        lat: place.center[0],
        lng: place.center[1]
      };
    });
    console.log(centers);

    const polygon = this.props.places.places.map(place => {
      return place.location.coordinates.map(values =>
        values.map(data => {
          return { lat: data[0], lng: data[1] };
        })
      );
    });

    console.log('POLYGON', polygon[0]);

    const paths = polygon[0];

    //center
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
          paths={paths}
          style={style}
          center={center}
          markerPositions={centers}
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
