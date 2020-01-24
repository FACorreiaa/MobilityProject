import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  Polygon
} from 'google-maps-react';
import React, { Component } from 'react';

export class MapContainer extends Component {
  renderMarker = loc => {
    return <Marker key={loc._id} position={loc} />;
  };

  renderPolygon = loc => {
    return (
      <Polygon
        paths={loc}
        strokeColor='#0000FF'
        strokeOpacity={0.8}
        strokeWeight={2}
        fillColor='#0000FF'
        fillOpacity={0.35}
      />
    );
  };

  render() {
    const coords = this.props.initialCenter;
    const markerPositions = this.props.markerPositions;
    const polygonPositions = this.props.polygonPositions;
    const style = this.props.style;
    const center = this.props.center;
    const paths = this.props.paths;

    console.log(this.props);
    return (
      <Map
        google={this.props.google}
        zoom={18}
        initialCenter={coords}
        style={style}
        center={center}
      >
        {markerPositions.map(this.renderMarker)}
        <Polygon
          paths={paths}
          strokeColor='#0000FF'
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor='#0000FF'
          fillOpacity={0.35}
        />
        {/* <Polygon
          paths={{ paths }}
          strokeColor='#0000FF'
          strokeOpacity={0.8}
          strokeWeight={2}
          fillColor='#0000FF'
          fillOpacity={0.35}
        /> */}
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_TEST
})(MapContainer);
