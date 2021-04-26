import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './signIn.scss';

const SignIn = ({ signIn, auth, history }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  useLayoutEffect(() => {
    if (auth.isAuthenticated) history.replace('/dashboard');
  }, [auth]);

  const onChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signIn(loginData);
  };

  return (
    <div className="sign-in-container">
      <form className="form-container" onSubmit={onSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="username"
          name="username"
          value={loginData.username}
          onChange={onChange}
          required
          id="username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={onChange}
          required
          id="password"
        />
        <Link to="/register" className="form-link">Not registered? Click to create an account!</Link>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
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

export default SignIn;
