/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './dashboard.scss';
import { storage } from '../../utils/firebase';
import { makePost } from '../../service/postsApi';
import Post from './components/Post';

const Dashboard = ({ auth }) => {
  const { accountData, accountId } = auth;
  const [fileUpload, setFileUpload] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [postData, setPostData] = useState({
    accountId: '',
    title: 'test',
    text: 'test',
    location: 'test',
    category: 'Travel',
    postImage: '',
  });

  useEffect(() => {
    if (postData.postImage !== '') {
      makePost(postData);
    }
  }, [postData.postImage]);

  const fileChange = (e) => {
    setFileUpload(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const fileUploadHandler = async () => {
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
          .then((url) => {
            setPostData({
              ...postData,
              accountId,
              postImage: url,
            });
          });
      },
    );
  };

  return (
    <div className="dashboard-container">
      <h1>
        Welcome
        {' '}
        { accountData.username }
      </h1>
      <input type="file" className="input-upload" onChange={fileChange} />
      {fileUpload && <img className="preview-image" src={previewImage} alt="fileUpload" />}
      <button type="button" onClick={fileUploadHandler}>Upload</button>
      <Post
        username="CatUser"
        title="Black sea"
        text="Wonderful seaside, with great views and nice peoples. The water level has varied significantly over geological time. Due to these variations in the water level in the basin, the surrounding shelf and associated aprons have sometimes been dry land. At certain critical water levels, connections with surrounding water bodies can become established. "
        location="Black Sea, Romania"
        category="Seas"
        image="https://firebasestorage.googleapis.com/v0/b/travel-the-worlds.appspot.com/o/images%2F24006-black-sea-cruises-constanta-old-casino-700x300.jpg?alt=media&token=cd20b3b3-1a28-4d19-a0a8-9955d53ca242"
        likes={0}
        shares={0}
      />
    </div>
  );
};

export default Dashboard;
