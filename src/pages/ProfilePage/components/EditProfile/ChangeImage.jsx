/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { changeProfileImage } from '../../../../service/authApi';
import { storage } from '../../../../utils/firebase';
import './changeImage.scss';

const ChangeImage = ({ closeModal, updateProfile }) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [keyFile, setKeyFile] = useState(new Date());

  useEffect(async () => {
    if (imageUrl !== '') {
      await changeProfileImage({
        profileImage: imageUrl,
      });
      setImageUrl('');
      closeModal();
      updateProfile();
      // alert('Image updated successfully');
    }
  }, [imageUrl]);

  const fileChange = (e) => {
    setFileUpload(e.target.files[0]);
  };

  const handleChangeImage = async (e) => {
    e.preventDefault();
    if (fileUpload !== null) {
      if (fileUpload.size > 1024 * 1024 * 5) {
        alert('File too big, upload images under 5Mb');
        setFileUpload(null);
        setKeyFile(new Date());
      } else {
        const upload = storage.ref(`/profiles/${fileUpload.name}`).put(fileUpload);
        await upload.on(
          'state_changed',
          (snapshot) => {
            console.log(snapshot._delegate);
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref('profiles')
              .child(fileUpload.name)
              .getDownloadURL()
              .then((url) => setImageUrl(url));
          },
        );
      }
    }
  };

  return (
    <div className="edit-profile-image">
      <p className="edit-title">Change profile image</p>
      <input
        type="file"
        className="input-upload"
        onChange={fileChange}
        accept="image/png, image/jpeg"
        key={keyFile}
      />
      <button type="button" onClick={handleChangeImage}>Done</button>
    </div>
  );
};

ChangeImage.propTypes = {
  closeModal: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default ChangeImage;
