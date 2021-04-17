import React from 'react';
import PropTypes from 'prop-types';
import './menuButtons.scss';
import { Link } from 'react-router-dom';

const MenuButton = ({
  image, text, isProfile, redirect,
}) => (
  <Link to={redirect} className="button-container" type="button">
    <img src={image} alt={image} className={isProfile ? 'profileImage' : ''} />
    <p>{text}</p>
  </Link>
);

MenuButton.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isProfile: PropTypes.bool,
  redirect: PropTypes.string,
};

MenuButton.defaultProps = {
  isProfile: false,
  redirect: '/',
};

export default MenuButton;
