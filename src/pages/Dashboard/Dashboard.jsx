/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './dashboard.scss';
import { storage } from '../../utils/firebase';
import { makePost } from '../../service/postsApi';

const Dashboard = ({ auth }) => {
  const { accountData, accountId } = auth;
  const [fileUpload, setFileUpload] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [postData, setPostData] = useState({
    accountId: '',
    title: 'test',
    text: 'test',
    country: 'test',
    postImage: '',
  });

  const fileChange = (e) => {
    setFileUpload(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const fileUploadHandler = () => {
    const upload = storage.ref(`/images/${fileUpload.name}`).put(fileUpload);
    upload.on(
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
            makePost(postData);
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
    </div>
  );
};

export default Dashboard;
