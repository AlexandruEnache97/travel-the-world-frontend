/* eslint-disable react/prop-types */
import React from 'react';

const Dashboard = ({ auth }) => {
  const { accountData } = auth;
  return (
    <div className="dashboard-container">
      <h1>
        Welcome
        {' '}
        { accountData.username }
      </h1>
    </div>
  );
};

export default Dashboard;
