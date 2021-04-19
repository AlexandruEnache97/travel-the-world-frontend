import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './mobileButton.scss';

const MobileButton = ({ getMobileMenu }) => {
  const [opened, setOpened] = useState(false);

  const handleChangeModal = () => {
    getMobileMenu(!opened);
    setOpened(!opened);
  };

  return (
    <button type="button" className="mobile-button" onClick={handleChangeModal}>
      {opened ? <img src="https://img.icons8.com/small/96/000000/circled-right.png" alt="close-button" />
        : <img src="https://img.icons8.com/small/96/000000/circled-left.png" alt="open-button" />}
    </button>
  );
};

MobileButton.propTypes = {
  getMobileMenu: PropTypes.func.isRequired,
};

export default MobileButton;
