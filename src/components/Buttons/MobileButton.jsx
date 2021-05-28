import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './mobileButton.scss';

const MobileButton = ({ mobileMenuHandler }) => {
  const [visible, setVisible] = useState(false);

  const handleChangeModal = () => {
    if (!visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
    mobileMenuHandler(!visible);
    setVisible(!visible);
  };

  return (
    <button
      type="button"
      className={visible ? 'mobile-button menu-open' : 'mobile-button'}
      onClick={handleChangeModal}
    >
      Menu
    </button>
  );
};

MobileButton.propTypes = {
  mobileMenuHandler: PropTypes.func.isRequired,
};

export default MobileButton;
