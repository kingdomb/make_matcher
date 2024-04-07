/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHomePageSlice } from 'app/pages/HomePage/slice';
import {
  selectError,
  selectFriendRequests,
  selectLoading,
  selectRecentFriendRequest,
} from 'app/pages/HomePage/slice/selectors';
import { selectAcessToken } from 'app/pages/AuthPage/slice/selectors';
import { testStyles } from '../testStyles';

const FriendRequestsTest = () => {
  const dispatch = useDispatch();
  const { actions } = useHomePageSlice();
  const friendRequests = useSelector(selectFriendRequests);
  const recentFriendRequest = useSelector(selectRecentFriendRequest);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const token = useSelector(selectAcessToken);
  const [requesteeId, setRequesteeId] = useState('');

  useEffect(() => {
    dispatch(actions.fetchFriendRequestsRequest({ token }));
  }, [dispatch, actions, token]);

  const handleCreateFriendRequest = () => {
    if (requesteeId) {
      dispatch(
        actions.createFriendRequestRequest({
          requestee_id: parseInt(requesteeId, 10),
          token,
        }),
      );
      dispatch(actions.fetchFriendRequestsRequest({ token }));
    }
    setRequesteeId('');
  };

  const handleDeleteFriendRequest = requestId => {
    dispatch(
      actions.deleteFriendRequestRequest({
        requestId,
        token,
      }),
    );
    dispatch(actions.fetchFriendRequestsRequest({ token }));
  };

  return (
    <div>
      <h4>REQUESTS</h4>
      <br />
      Enter Player ID:{' '}
      <input
        type="text"
        placeholder="Enter player ID"
        value={requesteeId}
        onChange={e => setRequesteeId(e.target.value)}
        style={{ marginRight: '10px' }}
        title="Enter Player ID to send Friend Request to"
      />
      <button
        style={testStyles.buttonBlue}
        onClick={handleCreateFriendRequest}
        title="Click to Send Friend Request"
      >
        Send Request
      </button>
      {recentFriendRequest && recentFriendRequest.friend_name && (
        <div style={{ fontSize: 12 }}>
          <div style={{ color: '#00b300' }}>
            <i>Last Request: [ID: {recentFriendRequest.requestee_id}] </i>
          </div>
        </div>
      )}
      <h4>Requests from Players:</h4>
      <div style={testStyles.list}>
        {friendRequests && friendRequests.length > 0 ? (
          <ul>
            {friendRequests.map(request => (
              <div key={request.requestor_id} style={{ fontSize: 12 }}>
                <button
                  style={testStyles.buttonRed}
                  onClick={() =>
                    handleDeleteFriendRequest(request.requestor_id)
                  }
                  title="Click to reject Friend Request"
                >
                  ×
                </button>{' '}
                {`ID: ${request.requestor_id}, Name: ${request.friend_name}`}
              </div>
            ))}
          </ul>
        ) : (
          <p>No friend requests.</p>
        )}
      </div>
    </div>
  );
};

export default FriendRequestsTest;
