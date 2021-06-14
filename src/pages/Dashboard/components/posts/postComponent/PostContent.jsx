import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MapModal from '../showPostMap/MapModal';
import calculateTimePassed from '../../../../../utils/postUtils';
import './postContent.scss';

const PostContent = ({
  title, location, country, category, text,
  postImage, coordinates, createdDate,
}) => {
  const [mapModal, setMapModal] = useState(false);

  const mapModalHandler = () => {
    setMapModal(true);
  };

  return (
    <>
      <div className="post-content">
        <h1 className="post-title">{title}</h1>
        <div className="post-location">
          <button type="button" className="location-text" onClick={mapModalHandler}>
            <img src="https://img.icons8.com/material/24/000000/worldwide-location--v1.png" alt="locationIcon" />
            <p>
              {location}
              ,
              {' '}
              {country}
            </p>
          </button>
          <div className="category-text">
            <img src="https://img.icons8.com/ios-glyphs/30/000000/category.png" alt="categoryIcon" />
            <p>{category}</p>
          </div>
        </div>
        <p className="post-time-passed">{calculateTimePassed(createdDate)}</p>
        <p className="post-text">{text}</p>
        {postImage !== '' && <img className="post-image" src={postImage} alt="postImage" />}
      </div>

      {mapModal && (
        <MapModal
          setMapModal={setMapModal}
          postLocation={`${location} ${country}`}
          postImage={postImage}
          postText={text}
          postCoordinates={coordinates}
        />
      )}
    </>
  );
};

PostContent.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  postImage: PropTypes.string,
  location: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  coordinates: PropTypes.objectOf(PropTypes.number).isRequired,
};

PostContent.defaultProps = {
  postImage: '',
};

export default PostContent;
