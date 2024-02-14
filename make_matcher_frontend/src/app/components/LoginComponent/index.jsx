import { useAuthSlice } from 'app/pages/AuthPage/slice';
import {
  // selectError,
  selectIsAuthenticated,
  selectLoading,
} from 'app/pages/AuthPage/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { InputComponent } from '../InputComponent';
import { isNotEmpty, hasMinLength } from '../../../utils/validation.js';
import './Login.scss';

export function LoginComponent(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useAuthSlice();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);

  const [enteredValues, setEnteredValues] = useState({
    username: '',
    password: '',
  });

  const [didChange, setDidChange] = useState({
    username: false,
    password: false,
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  let usernameIsInvalid =
    didChange.username && !isNotEmpty(enteredValues.username);
  let passwordIsInvalid =
    didChange.password && !hasMinLength(enteredValues.password.trim(), 8);

  function handleEnteredValues(identifier, value) {
    setEnteredValues(previousValues => ({
      ...previousValues,
      [identifier]: value,
    }));
    // Removes error when user starts typing again
    setDidChange(prevInput => ({
      ...prevInput,
      [identifier]: false,
    }));
  }

  function handleInputFocus(identifier) {
    setDidChange(prevInput => ({
      ...prevInput,
      [identifier]: true,
    }));
  }

  function handleLogin(e) {
    e.preventDefault();
    const loginFormData = new FormData(e.target);
    const loginData = Object.fromEntries(loginFormData.entries());

    //console.log('Login credentials:', loginData);

    dispatch(actions.loginRequest(loginData));
    e.target.reset();
  }

  return loading ? (
    'Loading...'
  ) : (
    <>
      <form onSubmit={handleLogin}>
        <h2 className="title">Log In</h2>
        <InputComponent
          label="Username"
          id="username"
          className="form-inputs"
          type="username"
          name="username"
          onBlur={() => handleInputFocus('username')}
          onChange={e => handleEnteredValues('username', e.target.value)}
          error={usernameIsInvalid && 'Please enter a valid username!'}
        />
        <InputComponent
          label="Password"
          id="password"
          className="form-inputs"
          type="password"
          name="password"
          onBlur={() => handleInputFocus('password')}
          onChange={e => handleEnteredValues('password', e.target.value)}
          error={passwordIsInvalid && 'Please enter a valid password!'}
        />

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
          <span onClick={() => navigate('/signup')}>here</span>.
        </p>
      </form>
    </>
  );
}
