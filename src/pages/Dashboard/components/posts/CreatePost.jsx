/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { storage } from '../../../../utils/firebase';
import './createPost.scss';
import CountrySelect from '../../../LandingPage/components/CountrySelect';
import countryCoordinates from '../../../../utils/countryCoordinates';
import PostMapLocation from './setPost/PostMapLocation';

const CreatePost = ({
  username, profileImage, createPost, createAlert, closeModal,
}) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [keyFile, setKeyFile] = useState(new Date());
  // const [previewImage, setPreviewImage] = useState(null);
  const [postData, setPostData] = useState({
    username: '',
    profileImage: '',
    title: '',
    text: '',
    country: '',
    location: '',
    coordinates: {
      lat: 33.93,
      lng: 67.71,
    },
    category: '',
    postImage: '',
    createdDate: '',
  });

  useEffect(() => {
    setPostData({
      ...postData,
      username,
      profileImage,
    });
  }, []);

  useEffect(() => {
    if (postData.postImage !== '') {
      createPost({
        ...postData,
        createdDate: Date.now(),
      });
      setPostData({
        ...postData,
        title: '',
        text: '',
        country: '',
        location: '',
        coordinates: {
          lat: 0,
          lng: 0,
        },
        category: '',
        postImage: '',
        createdDate: '',
      });
      setFileUpload(null);
      setKeyFile(new Date());
      closeModal();
      createAlert('Post created!', 3);
    }
  }, [postData.postImage]);

  const fileChange = (e) => {
    setFileUpload(e.target.files[0]);
    // setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const inputChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const getCountry = (country) => {
    setPostData({
      ...postData,
      country,
      coordinates: {
        lat: countryCoordinates[country][0],
        lng: countryCoordinates[country][1],
      },
    });
  };

  const getPostCoordinates = (coordinates) => {
    setPostData({
      ...postData,
      coordinates: {
        lat: coordinates.lat,
        lng: coordinates.lng,
      },
    });
  };

  const uploadHandler = async (e) => {
    e.preventDefault();
    if (fileUpload !== null) {
      if (fileUpload.size > 1024 * 1024 * 5) {
        alert('File too big, upload images under 5Mb');
        setFileUpload(null);
        setKeyFile(new Date());
      } else {
        const upload = storage.ref(`/images/${fileUpload.name}`).put(fileUpload);
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
              .ref('images')
              .child(fileUpload.name)
              .getDownloadURL()
              .then((url) => setPostData({
                ...postData,
                postImage: url,
              }));
          },
        );
      }
    } else if (postData.title !== '' && postData.text !== '' && postData.category !== '' && postData.location !== '') {
      createPost({
        ...postData,
        createdDate: Date.now(),
      });
      setPostData({
        ...postData,
        title: '',
        text: '',
        country: '',
        location: '',
        coordinates: {
          lat: 33.93,
          lng: 67.71,
        },
        category: '',
      });
      closeModal();
      createAlert('Post created without image!', 3);
    }
  };

  return (
    <div className="create-container">
      <div className="create-top">
        <div className="top-user">
          {profileImage !== '' && <img src={profileImage} alt="userIcon" />}
          <p>{username}</p>
        </div>
        <p>Create post</p>
      </div>
      <form onSubmit={uploadHandler}>
        <div className="create-content">
          <div className="create-element">
            <label htmlFor="titlePost">Title</label>
            <input
              name="title"
              type="text"
              id="titlePost"
              placeholder="Your post title"
              value={postData.title}
              onChange={inputChange}
              required
            />
          </div>

          <div className="create-element">
            <label htmlFor="textPost">Description</label>
            <textarea
              name="text"
              id="textPost"
              placeholder="Your post content"
              resize="none"
              value={postData.text}
              onChange={inputChange}
              required
            />
          </div>

          <div className="create-element">
            <label htmlFor="categoryPost">Category</label>
            <input
              name="category"
              type="text"
              id="categoryPost"
              placeholder="Your post category"
              value={postData.category}
              onChange={inputChange}
              required
            />
          </div>

          <div className="create-element">
            <label htmlFor="countryPost">Country</label>
            <CountrySelect getCountry={getCountry} />
          </div>

          <div className="create-element">
            <label htmlFor="locationPost">Location</label>
            <input
              name="location"
              type="text"
              id="locationPost"
              placeholder="Your post location"
              value={postData.location}
              onChange={inputChange}
              required
            />
          </div>
          <PostMapLocation
            countryCoordinates={postData.coordinates}
            getPostCoordinates={getPostCoordinates}
          />
        </div>
        <div className="create-upload">
          <label htmlFor="uploadImage">Upload image (not required)</label>
          <input
            type="file"
            className="input-upload"
            onChange={fileChange}
            accept="image/png, image/jpeg"
            key={keyFile}
          />
        </div>
        <div className="create-bottom">
          <button type="submit">
            <img src="https://img.icons8.com/pastel-glyph/64/ffffff/create-new--v3.png" alt="createPost" />
            <p>Create Post</p>
          </button>
        </div>
      </form>
    </div>
  );
};

CreatePost.propTypes = {
  username: PropTypes.string.isRequired,
  createPost: PropTypes.func.isRequired,
  profileImage: PropTypes.string.isRequired,
  createAlert: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default CreatePost;
