import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import imageCompression from 'browser-image-compression';
import { changeProfileImage } from '../../../../service/authApi';
import { storage } from '../../../../utils/firebase';

import './changeImage.scss';
import PreviewImage from '../../../../components/PreviewImage/PreviewImage';

const ChangeImage = ({ closeModal, updateProfile, createAlert }) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [previewModal, setPreviewModal] = useState(false);

  useEffect(async () => {
    if (imageUrl !== '') {
      await changeProfileImage({
        profileImage: imageUrl,
      });
      setImageUrl('');
      closeModal();
      updateProfile();
      createAlert('Image updated successfully', 3);
    }
  }, [imageUrl]);

  const fileChange = (e) => {
    setFileUpload(e.target.files[0]);
  };

  const imageUploadOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1080,
    useWebWorker: true,
  };

  const uploadImage = (imageFile) => {
    const upload = storage.ref(`/profiles/${imageFile.name}`).put(imageFile);
    upload.on(
      'state_changed',
      (/* snapshot */) => {
        // console.log(snapshot._delegate);
      },
      (error) => {
        createAlert(error);
      },
      () => {
        storage
          .ref('profiles')
          .child(fileUpload.name)
          .getDownloadURL()
          .then((url) => setImageUrl(url));
      },
    );
  };

  const handleChangeImage = async (e) => {
    e.preventDefault();
    if (fileUpload !== null) {
      if (fileUpload.size > 1024 * 1024 * 2) {
        try {
          const compressedFile = await imageCompression(fileUpload, imageUploadOptions);
          uploadImage(compressedFile);
        } catch (err) {
          createAlert(err, 3);
        }
      } else {
        uploadImage(fileUpload);
      }
    }
  };

  const handlePreviewImage = () => {
    setPreviewModal(!previewModal);
  };

  return (
    <div className="edit-profile-image">
      <label htmlFor="imageUpload" className="edit-title">Change profile image</label>
      <input
        type="file"
        id="imageUpload"
        className="input-upload"
        onChange={fileChange}
        accept="image/png, image/jpeg"
      />
      {fileUpload && <button type="button" onClick={handlePreviewImage}>Preview image</button>}
      <button type="button" onClick={handleChangeImage}>Done</button>
      {previewModal && (
        <PreviewImage
          image={URL.createObjectURL(fileUpload)}
          closeModal={handlePreviewImage}
        />
      )}
    </div>
  );
};

ChangeImage.propTypes = {
  closeModal: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  createAlert: PropTypes.func.isRequired,
};

export default ChangeImage;
