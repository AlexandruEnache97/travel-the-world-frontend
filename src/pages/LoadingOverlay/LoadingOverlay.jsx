import React from 'react';
import PropTypes from 'prop-types';
import './loadingOverlay.scss';

const LoadingOverlay = ({ loading }) => {
  LoadingOverlay.propTypes = {
    loading: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  };

  if (!loading.loadingState[0]) {
    return null;
  }

  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="loading-icon" data-testid="spinner" />
      </div>
    </div>
  );
};

export default LoadingOverlay;
