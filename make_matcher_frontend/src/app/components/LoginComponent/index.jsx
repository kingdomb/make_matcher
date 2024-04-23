import { useAuthSlice } from 'app/pages/AuthPage/slice';
import {
  selectError,
  selectIsAuthenticated,
  selectLoading,
} from 'app/pages/AuthPage/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styles from './Login.module.scss';
import { isNotEmpty, hasMinLength } from '../../../utils/validation.js';
import { ErrorMessageComponent } from '../ErrorMessageComponent';
import { LoadingIndicator } from '../LoadingIndicator';
import { InputComponent } from '../InputComponent';
// import { TypedInputComponent } from '../TypedInputComponent';

export function LoginComponent(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useAuthSlice();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [isNavigationPending, setIsNavigationPending] = useState(false);

  const [enteredValues, setEnteredValues] = useState({
    username: '',
    password: '',
  });

  const [didChange, setDidChange] = useState({
    username: false,
    password: false,
  });

  const [userProfileIsComplete, setUserProfileIsComplete] = useState(false);

  // if authenticated, either route to home,
  // or render Player Profile form component
  useEffect(() => {
    if (isAuthenticated && userProfileIsComplete) {
      setIsNavigationPending(true);
      setUserProfileIsComplete(true);
      navigate('/home');
    } else if (isAuthenticated) {
      setIsNavigationPending(true);
      navigate('/profile');
    }
  }, [isAuthenticated, userProfileIsComplete, navigate]);

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

  if (loading || isNavigationPending) {
    return <LoadingIndicator />;
  }

  return (
    <div className={styles['login-form']}>
      <form onSubmit={handleLogin}>
        <h2 className={styles['title']}>Log In</h2>
        <InputComponent
          label="Username"
          id="username"
          type="username"
          name="username"
          onBlur={() => handleInputFocus('username')}
          onChange={e => handleEnteredValues('username', e.target.value)}
          error={usernameIsInvalid && 'Please enter a valid username!'}
          containerClassName={styles['login']}
          inputClassName={styles['login-input']}
          labelClassName={styles['login-label']}
          errorClassName={styles['login-error']}
        />
        <InputComponent
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleInputFocus('password')}
          onChange={e => handleEnteredValues('password', e.target.value)}
          error={passwordIsInvalid && 'Please enter a valid password!'}
          containerClassName={styles['login']}
          inputClassName={styles['login-input']}
          labelClassName={styles['login-label']}
          errorClassName={styles['login-error']}
        />

        <div className={styles['checkbox-wrapper']}>
          <label>
            <input
              type="checkbox"
              className={styles['login-checkbox']}
              name="login checkbox"
            />
            Keep me logged in
          </label>
        </div>

        <div className={styles['login-btn-container']}>
          <button className={styles['login-btn']}>Log In</button>
        </div>

        <p className={styles['login-link']}>
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
    </div>
  );
}
