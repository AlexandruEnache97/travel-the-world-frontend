import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signIn.scss';

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: '',
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
  };

  return (
    <div className="sign-in-container">
      <form className="form-container" onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={onChange}
          required
          id="email"
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
