import React, { useState } from 'react';
import './register.scss';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    verifyPassword: '',
    country: '',
  });

  const onChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
        <input
          type="text"
          name="country"
          value={registerData.country}
          onChange={onChange}
          required
          id="country"
        />

        <p className="form-link">Have an account? Click to sign in!</p>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};
export default Register;
