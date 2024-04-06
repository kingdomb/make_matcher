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
import FriendTest from '../FriendTest';
import { selectError } from 'app/pages/HomePage/slice/selectors';
import { testStyles } from './testStyles';

interface Props {}

export function TestComponent(props: Props) {
  const dispatch = useDispatch();
  const { actions } = useTestComponentSlice();
  const status = useSelector(selectTestStatus);
  const loading = useSelector(selectTestLoading);
  const error = useSelector(selectError);

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
        {error && (
          <p style={testStyles.errorText}>Error: {error.errorMessage}</p>
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
              <FriendRequestsTest />
            </div>
          </div>
          <div style={testStyles.column}>
            <div style={testStyles.paper}>
              <FriendTest />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
