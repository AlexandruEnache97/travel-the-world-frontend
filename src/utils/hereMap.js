export const addDraggableMarker = (map, behavior, location, setCoordinates) => {
  const { H } = window;
  const icon = new H.map.Icon('https://img.icons8.com/android/48/000000/marker.png');
  const marker = new H.map.Marker(location, {
    // mark the object as volatile for the smooth dragging
    volatility: true,
    icon,
  });
    // Ensure that the marker can receive drag events
  marker.draggable = true;
  map.addObject(marker);

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
      setCoordinates(target.b);
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
};

export const createMarker = (map, location, icon, content, ui) => {
  const { H } = window;
  const iconMarker = new H.map.Icon(icon);
  const marker = new H.map.Marker(
    location, {
      icon: iconMarker,
    },
  );
  map.addObject(marker);

  if (content !== undefined) {
    marker.addEventListener('tap', (ev) => {
      const bubble = new H.ui.InfoBubble(ev.target.getGeometry(), {
        content,
      });
      ui.addBubble(bubble);
    });
  }
  return marker;
};
