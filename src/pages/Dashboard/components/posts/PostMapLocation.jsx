import React, { useState } from 'react';
import './postMapLocation.scss';

const PostMapLocation = () => {
  const [mapModal, setMapModal] = useState(false);
  return (
    <div className="post-map-control">
      <button type="button" onClick={() => { setMapModal(!mapModal); }}>
        Set location on map
      </button>
      {mapModal && (
        <>
          <div className="post-map-modal" onClickCapture={() => { setMapModal(!mapModal); }} />
          <div className="post-map-container">
            <h1 className="post-map-title">
              Set the marker on the map
            </h1>
            <div className="post-map-buttons">
              <button type="button" onClick={() => { setMapModal(!mapModal); }}>
                Done
              </button>
              <button type="button" onClick={() => { setMapModal(!mapModal); }}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostMapLocation;
