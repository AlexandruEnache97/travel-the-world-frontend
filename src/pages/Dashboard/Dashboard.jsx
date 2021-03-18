/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './dashboard.scss';

const Dashboard = ({ auth }) => {
  const { accountData } = auth;
  const [fileUpload, setFileUpload] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileChange = (e) => {
    setFileUpload(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
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
    </div>
  );
};

export default Dashboard;
