import * as React from 'react';

import './previewImage.scss';

interface Props {
  image: string,
  closeModal: (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>) => void
}

const PreviewImage: React.FC<Props> = ({ image, closeModal }) => (
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

export default PreviewImage;
