import { useAuthSlice } from 'app/pages/AuthPage/slice';
import {
  selectError,
  selectIsAuthenticated,
  selectLoading,
} from 'app/pages/AuthPage/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { InputComponent } from '../InputComponent';

import {
  isEmail,
  isZipCode,
  isNotEmpty,
  hasMinLength,
  isEqualsToOtherValue,
} from '../../../utils/validation.js';
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
  // added
  const [passwordMismatchError, setPasswordMismatchError] = useState('');

  // TODO ATTN Arbern
  // eslint-disable-next-line no-unused-vars
  const [userProfileIsComplete, setUserProfileIsComplete] = useState(false);

  const [enteredValues, setEnteredValues] = useState({
    username: '',
    email: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
  });

  const [didChange, setDidChange] = useState({
    username: false,
    email: false,
    zipCode: false,
    password: false,
    confirmPassword: false,
  });

  // if authenticated, either route to home,
  // or render Player Profile form component
  useEffect(() => {
    if (isAuthenticated && userProfileIsComplete) {
      setIsNavigationPending(true);
      navigate('/home');
    } else if (isAuthenticated) {
      setIsNavigationPending(true);
      navigate('/profile');
    }
  }, [isAuthenticated, userProfileIsComplete, navigate]);

  const usernameIsInvalid =
    didChange.username && !isNotEmpty(enteredValues.username);
  const emailIsInvalid =
    didChange.email && !isEmail(enteredValues.email.trim());
  const zipCodeIsInvalid =
    didChange.zipCode && !isZipCode(enteredValues.zipCode.trim(), 5);
  let passwordIsInvalid =
    didChange.password && !hasMinLength(enteredValues.password.trim(), 8);

  function handleEnteredValues(identifier, value) {
    setEnteredValues(previousValues => ({
      ...previousValues,
      [identifier]: value,
    }));

    // added
    // when input changed, reset passwordMismatchError message
    if (identifier === 'password' || identifier === 'confirmPassword') {
      setPasswordMismatchError('');
    }

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

  function handleSignUp(e) {
    e.preventDefault();

    // added
    if (
      !isEqualsToOtherValue(
        enteredValues.password.trim(),
        enteredValues.confirmPassword.trim(),
      )
    ) {
      setPasswordMismatchError('Passwords do not match!');
      return;
    }

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
          label="Email"
          id="email"
          className="form-inputs"
          type="email"
          name="email"
          onBlur={() => handleInputFocus('email')}
          onChange={e => handleEnteredValues('email', e.target.value)}
          error={emailIsInvalid && 'Please enter a valid email!'}
        />
        <InputComponent
          label="Zip Code"
          id="zip-code"
          type="text"
          name="zip-code"
          className="form-inputs"
          pattern="[0-9]{5}"
          title="Five digit zip code"
          onBlur={() => handleInputFocus('zipCode')}
          onChange={e => handleEnteredValues('zipCode', e.target.value)}
          error={zipCodeIsInvalid && 'Please enter a valid zip code!'}
        />
        <InputComponent
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleInputFocus('password')}
          onChange={e => handleEnteredValues('password', e.target.value)}
          error={passwordIsInvalid && 'Please enter a valid password!'}
        />
        <InputComponent
          label="Confirm Password"
          id="confirm-password"
          className="form-inputs"
          type="password"
          name="confirm-password"
          onBlur={() => handleInputFocus('confirm-password')}
          onChange={e => handleEnteredValues('confirmPassword', e.target.value)}
          error={passwordMismatchError}
        />
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
    </>
  );
}
