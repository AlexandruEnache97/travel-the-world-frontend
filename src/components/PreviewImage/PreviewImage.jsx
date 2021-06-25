import React from 'react';
import PropTypes from 'prop-types';

import './previewImage.scss';

const PreviewImage = ({ image, closeModal }) => (
  <>
    <div className="preview-modal" onClickCapture={closeModal} />
    <div className="preview-image-modal">
      <div className="preview-image-top">
        <p>Preview image</p>
        <button
          type="button"
          className="close-modal"
          onClick={closeModal}
        >
          x
        </button>
      </div>
      <img src={image} alt="previewImage" />
      <div className="preview-image-bottom" />
    </div>
  </>
);

PreviewImage.propTypes = {
  image: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default PreviewImage;
