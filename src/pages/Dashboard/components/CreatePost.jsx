/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { storage } from '../../../utils/firebase';
import './createPost.scss';
import { makePost } from '../../../service/postsApi';

const CreatePost = ({ accountId, username, userIcon }) => {
  const [fileUpload, setFileUpload] = useState(null);
  // const [previewImage, setPreviewImage] = useState(null);
  const [postData, setPostData] = useState({
    accountId: '',
    title: '',
    text: '',
    location: '',
    category: '',
    postImage: '',
  });

  useEffect(() => {
    setPostData({
      ...postData,
      accountId,
    });
  }, []);

  useEffect(() => {
    if (postData.postImage !== '') {
      makePost(postData);
      setPostData({
        ...postData,
        title: '',
        text: '',
        location: '',
        category: '',
        postImage: '',
      });
      setFileUpload(null);
      alert('Post created');
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

  const uploadHandler = async (e) => {
    e.preventDefault();
    if (fileUpload !== null) {
      console.log('Image');
      const upload = storage.ref(`/images/${fileUpload.name}`).put(fileUpload);
      await upload.on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot);
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
    } else if (postData.title !== '' && postData.text !== '' && postData.category !== '' && postData.location !== '') {
      makePost(postData);
      setPostData({
        ...postData,
        title: '',
        text: '',
        location: '',
        category: '',
      });
      alert('Post created without image');
    }
  };

  CreatePost.propTypes = {
    accountId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    userIcon: PropTypes.string.isRequired,
  };

  return (
    <div className="create-container">
      <div className="create-top">
        <div className="top-user">
          <img src={userIcon} alt="userIcon" />
          <p>{username}</p>
        </div>
        <p>Create post</p>
      </div>
      <form onSubmit={uploadHandler}>
        <div className="create-content">
          <label htmlFor="titlePost">Post title</label>
          <input
            name="title"
            type="text"
            id="titlePost"
            placeholder="Your post title"
            value={postData.title}
            onChange={inputChange}
            required
          />

          <label htmlFor="textPost">Post description</label>
          <textarea
            name="text"
            id="textPost"
            placeholder="Your post content"
            resize="none"
            value={postData.text}
            onChange={inputChange}
            required
          />

          <label htmlFor="categoryPost">Post category</label>
          <input
            name="category"
            type="text"
            id="categoryPost"
            placeholder="Your post category"
            value={postData.category}
            onChange={inputChange}
            required
          />

          <label htmlFor="locationPost">Post location</label>
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
        <div className="create-upload">
          <label htmlFor="uploadImage">Upload image (not required)</label>
          <input type="file" className="input-upload" onChange={fileChange} />
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

export default CreatePost;
