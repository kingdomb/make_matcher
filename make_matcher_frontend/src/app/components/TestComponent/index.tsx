/**
 *
 * TestComponent
 *
 */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTestError,
  selectTestLoading,
  selectTestStatus,
} from './slice/selectors';
import { useTestComponentSlice } from './slice';
import { CSSProperties } from 'react';
import { LogoutButton } from '../LogoutButton/Loadable';
import ProfileTest from '../ProfileTest';
import FriendRequestsTest from '../FriendRequestsTest';

interface Props {}

export const testStyles: Record<string, CSSProperties> = {
  container: {
    width: '1200px',
    fontFamily: 'Arial, sans-serif',
    margin: '20px',

    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#333',
  },
  subHeader: {
    marginTop: '10px',
    fontSize: '16px',
    color: '#555',
  },
  paragraph: {
    fontFamily: 'Arial, sans-serif',
  },
  successText: {
    fontFamily: 'Arial, sans-serif',
    color: 'green',
  },
  errorText: {
    fontFamily: 'Arial, sans-serif',
    color: 'red',
  },
  buttonBlue: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: 'none',
  },
  buttonRed: {
    backgroundColor: '#ff0000',
    color: '#ffffff',
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: 'none',
  },
  paper: {
    padding: '20px',
    margin: '10px',
    backgroundColor: '#ffffff',
    boxShadow:
      '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    width: '300px',
    height: '400px',
    overflowY: 'auto',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: '20px',
  },
  column: {
    flex: '1',
  },
};

export function TestComponent(props: Props) {
  const dispatch = useDispatch();
  const { actions } = useTestComponentSlice();
  const status = useSelector(selectTestStatus);
  const loading = useSelector(selectTestLoading);
  const error = useSelector(selectTestError);

  return (
    <div style={testStyles.container}>
      <div style={testStyles.header}>Make Matcher Team 1</div>
      <div style={testStyles.paragraph}>(Test Components)</div>
      <div style={testStyles.subHeader}>
        <button
          onClick={() => dispatch(actions.fetchStatus())}
          style={testStyles.buttonBlue}
        >
          FETCH API STATUS
        </button>
        {!loading && !status && !error && (
          <p style={testStyles.paragraph}>Click button to view API Status</p>
        )}
        {loading && <p style={testStyles.paragraph}>Loading...</p>}
        {status && <p style={testStyles.successText}>Status: {status}</p>}
        {error && <p style={testStyles.errorText}>Error: {error}</p>}
        <div style={testStyles.row}>
          {' '}
          {/* This is a row */}
          <div style={testStyles.column}>
            <div style={testStyles.paper}>
              <ProfileTest />
            </div>
          </div>
          <div style={testStyles.column}>
            <div style={testStyles.paper}>
              <FriendRequestsTest />
            </div>
          </div>
        </div>
        <LogoutButton />
      </div>
    </div>
  );
}
