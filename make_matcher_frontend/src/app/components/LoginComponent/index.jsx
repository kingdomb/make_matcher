import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export function LoginComponent(props) {
  const navigate = useNavigate();

  const [userData, setUserData] = useState('');

  function handleLogin(e) {
    e.preventDefault();
    const loginFormData = new FormData(e.target);
    setUserData(Object.fromEntries(loginFormData.entries()));
    console.log(userData);
    e.target.reset();
    navigate('/home');
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <h2 className="title">Log In</h2>
        <div className="form-sections">
          <label className="form-labels" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="username"
            name="username"
            title="Type a username e.g. galaxyuser000"
            autoComplete="username"
          />
        </div>

        <div className="form-sections">
          <label className="form-labels" htmlFor="password">
            Password
          </label>
          <input
            type="text"
            id="password"
            className="password form-inputs"
            name="password"
            title="Type your new password"
            autoComplete="new-password"
          />
        </div>

        <button className="signup-btn">Log In</button>
        <div className="ex-account text-center">
          <p>
            Create an account{' '}
            <button className="link-style" onClick={() => navigate('/signup')}>
              here
            </button>
            .
          </p>
          <div className="divider"></div>
        </div>
      </form>
    </>
  );
}
