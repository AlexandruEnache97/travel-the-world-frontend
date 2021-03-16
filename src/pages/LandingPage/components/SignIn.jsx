import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './signIn.scss';

const SignIn = ({ signIn }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

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

  SignIn.propTypes = {
    signIn: PropTypes.func.isRequired,
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

export default SignIn;
