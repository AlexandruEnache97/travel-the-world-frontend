/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { storage } from '../../../utils/firebase';
import './editProfile.scss';
import { changeProfileImage } from '../../../service/authApi';

const EditProfile = ({ closeModal, updateProfile }) => {
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
    <div className="edit-profile-container">
      <div className="edit-top">
        <p>Edit profile</p>
        <button type="button" onClick={closeModal}>x</button>
      </div>
      <div className="edit-content">
        <div className="edit-profile-image">
          <label htmlFor="uploadImage">Change profile image</label>
          <input
            type="file"
            className="input-upload"
            onChange={fileChange}
            accept="image/png, image/jpeg"
            key={keyFile}
          />
          <button type="button" onClick={handleChangeImage}>Done</button>
        </div>
      </div>
      <div className="edit-bottom" />
    </div>
  );
};

EditProfile.propTypes = {
  closeModal: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

export default EditProfile;
