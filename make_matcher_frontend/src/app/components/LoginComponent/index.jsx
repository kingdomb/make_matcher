import { useAuthSlice } from 'app/pages/AuthPage/slice';
import {
  selectError,
  selectIsAuthenticated,
  selectLoading,
} from 'app/pages/AuthPage/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import './Login.scss';
import { ErrorMessageComponent } from '../ErrorMessageComponent';
import { LoadingIndicator } from '../LoadingIndicator';

export function LoginComponent(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useAuthSlice();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [isNavigationPending, setIsNavigationPending] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsNavigationPending(true);
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  function handleLogin(e) {
    e.preventDefault();
    const loginFormData = new FormData(e.target);
    const loginData = Object.fromEntries(loginFormData.entries());

    console.log('Login credentials:', loginData);

    dispatch(actions.loginRequest(loginData));
    e.target.reset();
  }

  if (loading || isNavigationPending) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <h2 className="title">Log In</h2>
        <div className="form-input-sections">
          <input
            type="text"
            id="username"
            className="username"
            name="username"
            title="Type a username e.g. galaxyuser000"
          />
          <label className="form-labels" htmlFor="username">
            Username
          </label>
        </div>

        <div id="last-input" className="form-input-sections">
          <input
            type="text"
            id="password"
            className="password form-inputs"
            name="password"
            title="Type your new password"
          />
          <label className="form-labels" htmlFor="password">
            Password
          </label>
        </div>

        <div className="checkbox-wrapper">
          <label>
            <input
              type="checkbox"
              className="login-checkbox"
              name="login checkbox"
            />
            Keep me logged in
          </label>
        </div>

        <div className="login-btn-container">
          <button className="login-btn">Log In</button>
        </div>

        <p className="login-link">
          Don't have an account? Create one{' '}
          <span
            onClick={() => {
              navigate('/signup');
              dispatch(actions.clearError());
            }}
          >
            here
          </span>
          .
        </p>
        {error ? <ErrorMessageComponent error={error} /> : <></>}
      </form>
    </>
  );
}
