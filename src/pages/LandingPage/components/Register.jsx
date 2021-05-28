import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CountrySelect from './CountrySelect';
import './register.scss';
import countryCoordinates from '../../../utils/countryCoordinates';

const Register = ({ signUp, auth, history }) => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    verifyPassword: '',
    country: 'Afghanistan',
    userLocation: {
      lat: 0,
      lng: 0,
    },
  });

  useLayoutEffect(() => {
    if (auth.isAuthenticated) history.replace('/dashboard');
  }, [auth]);

  const onChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    signUp(registerData);
  };

  const onChangeCountry = (country) => {
    setRegisterData({
      ...registerData,
      country,
      userLocation: {
        lat: countryCoordinates[country][0],
        lng: countryCoordinates[country][1],
      },
    });
  };

  return (
    <div className="register-container">
      <form className="form-container" onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={registerData.username}
          onChange={onChange}
          required
          id="username"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={registerData.email}
          onChange={onChange}
          required
          id="email"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={registerData.password}
          onChange={onChange}
          required
          id="password"
        />

        <label htmlFor="verifyPassword">Verify password</label>
        <input
          type="password"
          name="verifyPassword"
          value={registerData.verifyPassword}
          onChange={onChange}
          required
          id="verifyPassword"
        />

        <label htmlFor="country">Country</label>
        <CountrySelect onChangeCountry={onChangeCountry} />

        <Link to="/login" className="form-link">Have an account? Click to sign in!</Link>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

Register.propTypes = {
  signUp: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    accountData: PropTypes.shape({
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      profileImage: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      userLocation: PropTypes.objectOf(PropTypes.number).isRequired,
    }).isRequired,
    accountId: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

export default Register;
