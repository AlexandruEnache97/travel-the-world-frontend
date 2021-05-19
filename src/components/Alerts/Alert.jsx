import React from 'react';
import PropTypes from 'prop-types';
import './alert.scss';

const Alert = ({ removeAlert, alert }) => {
  const cancelAlert = () => {
    removeAlert(alert.message);
  };

  return (
    <>
      { alert.active && (
        <div className="alert-container">
          <p>{alert.message}</p>
          <button type="button" onClick={cancelAlert}>x</button>
        </div>
      )}
    </>
  );
};

Alert.propTypes = {
  alert: PropTypes.shape({
    active: PropTypes.bool,
    message: PropTypes.string,
  }).isRequired,
  removeAlert: PropTypes.func.isRequired,
};

export default Alert;
