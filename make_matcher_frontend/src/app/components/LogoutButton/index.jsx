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

export function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useAuthSlice();

  const handleLogout = () => {
    dispatch(actions.logout());
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
