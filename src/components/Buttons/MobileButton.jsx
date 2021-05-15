import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './mobileButton.scss';

const MobileButton = ({ getMobileMenu }) => {
  const [opened, setOpened] = useState(false);

  const handleChangeModal = () => {
    if (!opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
    getMobileMenu(!opened);
    setOpened(!opened);
  };

  return (
    <button
      type="button"
      className={opened ? 'mobile-button menu-open' : 'mobile-button'}
      onClick={handleChangeModal}
    >
      Menu
    </button>
  );
};

MobileButton.propTypes = {
  getMobileMenu: PropTypes.func.isRequired,
};

export default MobileButton;
