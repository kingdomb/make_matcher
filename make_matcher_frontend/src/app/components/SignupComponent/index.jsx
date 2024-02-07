import { useAuthSlice } from 'app/pages/AuthPage/slice';
import {
  selectError,
  selectIsAuthenticated,
  selectLoading,
} from 'app/pages/AuthPage/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './Signup.scss';
import { ErrorMessageComponent } from '../ErrorMessageComponent';
import { LoadingIndicator } from '../LoadingIndicator';

export function SignupComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useAuthSlice();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [isNavigationPending, setIsNavigationPending] = useState(false);

  // if authenticated, either route to home,
  // or render Player Profile form component
  useEffect(() => {
    if (isAuthenticated) {
      setIsNavigationPending(true);
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  function handleSignUp(e) {
    e.preventDefault();
    const signupFormData = new FormData(e.target);
    const signupData = Object.fromEntries(signupFormData.entries());

    console.log('Signup data:', signupData);

    dispatch(actions.signupRequest(signupData));
    e.target.reset();
  }

  if (loading || isNavigationPending) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <form onSubmit={handleSignUp}>
        <h2 className="title">Welcome!</h2>
        <span className="sub-title">Sign up here.</span>
        <div className="form-input-sections">
          <input
            type="text"
            id="username"
            className="username"
            name="username"
            title="Type a username e.g. galaxyuser000"
            required
          />
          <label className="form-labels" htmlFor="username">
            Username
          </label>
        </div>

        <div className="form-input-sections">
          <input
            type="email"
            id="email"
            className="email"
            name="email"
            title="Type an email e.g. example@address.com"
            required
          />
          <label className="form-labels" htmlFor="email">
            Email
          </label>
        </div>

        <div className="form-input-sections">
          <input
            type="text"
            id="zip-code"
            className="zip-code form-inputs"
            name="zip-code"
            pattern="[0-9]{5}"
            title="Five digit zip code"
            required
          />
          <label className="form-labels" htmlFor="zip-code">
            Zip Code
          </label>
        </div>
        <div className="form-input-sections">
          <input
            type="text"
            id="password"
            className="password form-inputs"
            name="password"
            title="Type your new password"
            required
          />
          <label className="form-labels" htmlFor="password">
            Password
          </label>
        </div>

        <div id="last-input" className="form-input-sections">
          <input
            type="text"
            id="confirm-password"
            className="confirm-password form-inputs"
            name="confirm-password"
            title="Re-type your new password again"
            required
          />
          <label className="form-labels" htmlFor="confirm-password">
            Confirm Password
          </label>
        </div>
        <p className="login-link">
          Already have an account? Sign in{' '}
          <span
            onClick={() => {
              navigate('/');
              dispatch(actions.clearError());
            }}
          >
            here
          </span>
          .
        </p>
        <div className="signup-btn-container">
          <button className="signup-btn">Create Account</button>
        </div>
        {error ? <ErrorMessageComponent error={error} /> : <></>}
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
