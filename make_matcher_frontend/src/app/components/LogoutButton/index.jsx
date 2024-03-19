/**
 *
 * LogoutButton
 *
 */
import * as React from 'react';
import { testStyles } from '../TestComponent';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useAuthSlice } from 'app/pages/AuthPage/slice';
import { testComponentActions } from '../TestComponent/slice';
import { useHomePageSlice } from 'app/pages/HomePage/slice';

export function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useAuthSlice();
  const { actions: homePageActions } = useHomePageSlice();

  const handleLogout = () => {
    dispatch(actions.logout());
    dispatch(homePageActions.reset());
    dispatch(testComponentActions.reset());
    console.log('Logged out.');
    navigate('/');
  };

  return (
    <div>
      {/* TODO: update logout button styling */}
      <button onClick={handleLogout} style={testStyles.button}>
        Log out
      </button>
    </div>
  );
}
