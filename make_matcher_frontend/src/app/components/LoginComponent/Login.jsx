import React, { useState } from 'react';

export function Login(props) {
  const [userData, setUserData] = useState('');
  const [rerouteToSignup, setRerouteToSignup] = useState(false);

  function handleUserStatus() {
    setRerouteToSignup(props.userStatus);
  }

  function handleLogin(e) {
    e.preventDefault();
    const loginFormData = new FormData(e.target);
    setUserData(Object.fromEntries(loginFormData.entries()));
    console.log(userData);
    e.target.reset();
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
            Create an account <a onClick={handleUserStatus}>here.</a>
          </p>
          <div className="divider"></div>
        </div>
      </form>
    </>
  );
}
