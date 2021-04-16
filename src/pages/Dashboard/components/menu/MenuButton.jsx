import React from 'react';
import PropTypes from 'prop-types';
import './menuButtons.scss';

const MenuButton = ({ image, text, isProfile }) => (
  <button className="button-container" type="button">
    <img src={image} alt={image} className={isProfile ? 'profileImage' : ''} />
    <p>{text}</p>
  </button>
);

MenuButton.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isProfile: PropTypes.bool,
};

MenuButton.defaultProps = {
  isProfile: false,
};

export default MenuButton;
