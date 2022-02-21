import * as React from 'react';
import './menuButtons.scss';
import { Link } from 'react-router-dom';

interface Props {
  image: string,
  text: string,
  isProfile?: boolean,
  redirect?: string
}

const MenuButton: React.FC<Props> = ({
  image, text, isProfile = false, redirect = '/',
}) => (
  <Link to={redirect} className="button-container" type="button">
    <img src={image} alt={image} className={isProfile ? 'profileImage' : ''} />
    <p>{text}</p>
  </Link>
);

export default MenuButton;
