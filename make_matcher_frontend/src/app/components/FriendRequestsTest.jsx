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
import { testStyles } from './TestComponent';

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
      <h4>Friend Requests Test Component</h4>
      <br />
      {error && <p style={{ color: 'red' }}>Error: {error.errorMessage}</p>}
      Enter Friend ID:{' '}
      <input
        type="text"
        placeholder="Enter requestee ID"
        value={requesteeId}
        onChange={e => setRequesteeId(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button style={testStyles.buttonBlue} onClick={handleCreateFriendRequest}>
        Create Friend Request
      </button>
      {recentFriendRequest && recentFriendRequest.friend_name && (
        <div>
          Last request sent to: {recentFriendRequest.friend_name} [ID:{' '}
          {recentFriendRequest.requestee_id}]{' '}
        </div>
      )}
      <br />
      <h4>Friend Requests:</h4>
      {friendRequests && friendRequests.length > 0 ? (
        <ul>
          {friendRequests.map(request => (
            <div key={request.id}>
              {`Requester ID: ${request.requestor_id}, Name: ${request.friend_name}`}
              <button
                style={testStyles.buttonRed}
                onClick={() => handleDeleteFriendRequest(request.requestor_id)}
              >
                X
              </button>
            </div>
          ))}
        </ul>
      ) : (
        <p>No friend requests.</p>
      )}
    </div>
  );
};

export default FriendRequestsTest;
