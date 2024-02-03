import React, { useState } from 'react';

export function Signup() {
  async function handleSignUp(e) {
    e.preventDefault();
    const loginFormData = new FormData(e.target);
    const userData = Object.fromEntries(loginFormData.entries());

    console.log(userData);

    e.target.reset();
  }

  return (
    <>
      <form onSubmit={handleSignUp}>
        <h2 className="title">Welcome</h2>
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
          <label className="form-labels" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="email"
            name="email"
            title="Type an email e.g. example@address.com"
            autoComplete="email"
          />
        </div>

        <div className="form-sections">
          <label className="form-labels" htmlFor="zip-code">
            Zip Code
          </label>
          <input
            type="text"
            id="zip-code"
            className="zip-code form-inputs"
            name="zip-code"
            pattern="[0-9]{5}"
            title="Five digit zip code"
            autoComplete="postal-code"
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
        <div className="form-sections">
          <label className="form-labels" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            type="text"
            id="confirm-password"
            className="confirm-password form-inputs"
            name="confirm-password"
            title="Type your new password again"
            autoComplete="new-password"
          />
        </div>
        <button className="signup-btn">Create Account</button>
        <div className="ex-account text-center">
          <p>
            Already have an account? Signin <a href="/">here</a>
          </p>
          <div className="divider"></div>
        </div>
      </form>

      <div style={{ display: 'none' }} className="password-requirements">
        <ul className="list-unstyled">
          <li className="">
            <span className="low-upper-case">
              <i className="low-upper-case-text" aria-hidden="true">
                &nbsp;Lowercase &amp; Uppercase
              </i>
            </span>
          </li>
          <li className="">
            <span className="one-number">
              <i className="one-number-text" aria-hidden="true">
                &nbsp;Number (0-9)
              </i>
            </span>
          </li>
          <li className="">
            <span className="one-special-char">
              <i className="one-special-char-text" aria-hidden="true">
                &nbsp;Special Character (!@#$%^&*)
              </i>
            </span>
          </li>
          <li className="">
            <span className="character-length">
              <i className="character-length-text" aria-hidden="true">
                &nbsp; 8 - 12 Characters
              </i>
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
