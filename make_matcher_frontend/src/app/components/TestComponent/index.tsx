/* eslint-disable @typescript-eslint/no-unused-vars */
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
import ProfileTest from './components/ProfileTest';
import FriendRequestsTest from './components/FriendRequestsTest';
import FriendTest from './components/FriendTest';
import { selectError } from 'app/pages/HomePage/slice/selectors';
import { testStyles } from './testStyles';
import MatchesTest from './components/MatchesTest';
import GroupsTest from './components/GroupsTest';

interface Props {}

export function TestComponent(props: Props) {
  const dispatch = useDispatch();
  const { actions } = useTestComponentSlice();
  const status = useSelector(selectTestStatus);
  const loading = useSelector(selectTestLoading);
  const error = useSelector(selectError);

  return (
    <div style={testStyles.container}>
      <div>
        <br />
      </div>
      <div style={{ ...testStyles.paragraph, color: '#be0000' }}>
        (Rudimentary Components to demonstrate{' '}
        <u>
          <b>Web Services</b>
        </u>{' '}
        features)
      </div>
      <div style={testStyles.subHeader}>
        <button
          onClick={() => dispatch(actions.fetchStatus())}
          style={testStyles.buttonBlue}
          title="Click to Fetch API Server Status"
        >
          FETCH API STATUS
        </button>
        {!loading && !status && !error && (
          <p style={testStyles.paragraph}>
            Click button to view API Server Status
          </p>
        )}

        {loading && <p style={testStyles.paragraph}>Loading...</p>}
        {status && (
          <p style={testStyles.successText}>API Server Status: {status}</p>
        )}
        {error && (
          <p style={testStyles.errorText}>Error: {error.errorMessage}</p>
        )}
        {error && error.errorMessage === 'Unauthorized' && (
          <div style={testStyles.errorText}>PLEASE LOG IN.</div>
        )}
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
              <GroupsTest />
            </div>
          </div>
          <div style={testStyles.column}>
            <div style={testStyles.paper}>
              <FriendRequestsTest />
            </div>
          </div>
          <div style={testStyles.column}>
            <div style={testStyles.paper}>
              <FriendTest />
            </div>
          </div>
          <div style={testStyles.column}>
            <div style={testStyles.paper}>
              <MatchesTest />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
