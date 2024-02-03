/**
 *
 * LogoutButton
 *
 */
import * as React from 'react';
import { testStyles } from '../TestComponent';
import { useNavigate } from 'react-router';

export function LogoutButton() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/')} style={testStyles.button}>
        Log out
      </button>
    </div>
  );
}
