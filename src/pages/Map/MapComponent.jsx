/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Navbar from '../Dashboard/components/Navbar';
// import addDraggableMarker from '../../utils/hereMap';
import './mapComponent.scss';

export class MapComponent extends Component {
  constructor() {
    super();
    this.mapRef = React.createRef();
    this.state = {
      map: null,
      coordinates: null,
    };
  }

  addDraggableMarker(map, behavior) {
    const { H } = window;
    const icon = new H.map.Icon('https://img.icons8.com/android/48/000000/marker.png');
    const icon2 = new H.map.Icon('https://img.icons8.com/android/48/DC143C/marker.png');
    const marker = new H.map.Marker({ lat: 48.205568558488956, lng: 16.36581899736703 }, {
      // mark the object as volatile for the smooth dragging
      volatility: true,
      icon,
    });
      // Ensure that the marker can receive drag events
    marker.draggable = true;
    map.addObject(marker);

    const marker2 = new H.map.Marker({ lat: 45.643200462934786, lng: 25.590293804626917 }, {
      // mark the object as volatile for the smooth dragging
      icon: icon2,
    });
    // Ensure that the marker can receive drag events\
    map.addObject(marker2);

    // disable the default draggability of the underlying map
    // and calculate the offset between mouse and target's position
    // when starting to drag a marker object:
    map.addEventListener('dragstart', (ev) => {
      const { target } = ev;
      const pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        const targetPosition = map.geoToScreen(target.getGeometry());
        target.offset = new H.math.Point(
          pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y,
        );
        behavior.disable();
      }
    }, false);

    // re-enable the default draggability of the underlying map
    // when dragging has completed
    map.addEventListener('dragend', (ev) => {
      const { target } = ev;
      if (target instanceof H.map.Marker) {
        behavior.enable();
        this.setState({ coordinates: target.b });
      }
    }, false);

    // Listen to the drag event and move the position of the marker
    // as necessary
    map.addEventListener('drag', (ev) => {
      const { target } = ev;
      const pointer = ev.currentPointer;
      if (target instanceof H.map.Marker) {
        target.setGeometry(
          map.screenToGeo(pointer.viewportX - target.offset.x, pointer.viewportY - target.offset.y),
        );
      }
    }, false);
  }

  componentDidMount() {
    const { H } = window;
    const platform = new H.service.Platform({
      apikey: 'pFgYJtHrqTkrDk2tguYJQ4Vc2ApdTsbX6edK6WJPkgY',
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: { lat: 45.643200462934786, lng: 25.590293804626917 },
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1,
      },
    );

    // eslint-disable-next-line no-unused-vars
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    H.ui.UI.createDefault(map, defaultLayers);

    this.addDraggableMarker(map, behavior);
    this.setState({ map });
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }

  render() {
    return (
      <>
        <Navbar />
        <div ref={this.mapRef} className="map-container" />
        <div className="map-control">
          {this.state.coordinates !== null && (
          <>
            <p>
              Lat:
              {' '}
              {this.state.coordinates.lat}
            </p>
            <p>
              Lng:
              {' '}
              {this.state.coordinates.lng}
            </p>
          </>
          )}
        </div>
      </>
    );
  }
}

export default MapComponent;
