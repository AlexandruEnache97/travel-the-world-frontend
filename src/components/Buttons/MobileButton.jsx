import React, { useState } from 'react';
import './mobileButton.scss';

const MobileButton = () => {
  const [opened, setOpened] = useState(false);

  const handleChangeModal = () => {
    setOpened(!opened);
  };

  return (
    <button type="button" className="mobile-button" onClick={handleChangeModal}>
      {opened ? <img src="https://img.icons8.com/small/32/000000/circled-left.png" alt="open-button" />
        : <img src="https://img.icons8.com/small/32/000000/circled-right.png" alt="close-button" />}
    </button>
  );
};

export default MobileButton;
