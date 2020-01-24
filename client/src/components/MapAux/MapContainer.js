import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polygon
} from 'google-maps-react';
import React, { Component } from 'react';
export class MapContainer extends Component {
  render() {
    const coords = this.props.initialCenter;
    const position = this.props.position;
    const paths = this.props.paths;
    const style = this.props.style;
    const center = this.props.center;
    const google = this.props.google;
    return (
      <Map
        google={google}
        zoom={18}
        initialCenter={coords}
        style={style}
        center={center}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Current location'}
          position={position}
        />
        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>Test</h1>
          </div>
        </InfoWindow>
        <Polygon
          paths={paths}
          strokeColor='#0000FF'
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor='#0000FF'
          fillOpacity={0.35}
        />
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_TEST
})(MapContainer);
