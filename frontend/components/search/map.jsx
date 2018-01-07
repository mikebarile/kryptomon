import React from 'react';
import { Link } from 'react-router';
import MarkerManager from '../../util/marker_manager';

const _getCoordsObj = latLng => ({
  lat: latLng.lat(),
  lng: latLng.lng()
});

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const mapDOMNode = this.refs.map;

    let mapOptions;
    if(this.props.lat !== "" && this.props.lat !== undefined) {
      mapOptions = {
        center: {lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lng)},
        zoom: 13
      };
    }
    else {
      mapOptions = {
        center: {lat: 0, lng: 0},
        zoom: 2
      };
    }
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this._registerListeners();
    this.MarkerManager = new MarkerManager(this.map);
    this.MarkerManager.updateMarkers(this.props.listings);
  }

  componentDidUpdate() {
    this.MarkerManager.updateMarkers(this.props.listings);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.lat !== newProps.lat && this.props.lng !== newProps.lng){
      this.map.setOptions({
        center: {lat: parseFloat(newProps.lat), lng: parseFloat(newProps.lng)},
        zoom: 13
      });
    }
  }

  _registerListeners() {
    google.maps.event.addListener(this.map, 'idle', () => {
      const { north, south, east, west } = this.map.getBounds().toJSON();
      const bounds = {
        northEast: { lat:north, lng: east },
        southWest: { lat: south, lng: west } };
      this.props.updateFilter({bounds});
    });
  }

  _handleMarkerClick(listing) {
    this.props.router.push(`listings/${listing.id}`);
  }

  render() {
    return (
      <div
        id='map-container'
        ref='map'>
      </div>
    );
  }
}

export default Map;
