/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHomePageSlice } from 'app/pages/HomePage/slice';
import {
  selectCreateFriend,
  selectError,
  selectFriends,
  selectLoading,
} from 'app/pages/HomePage/slice/selectors';
import { selectAcessToken } from 'app/pages/AuthPage/slice/selectors';
import { testStyles } from '../testStyles';

const FriendTest = () => {
  const dispatch = useDispatch();
  const { actions } = useHomePageSlice();
  const friends = useSelector(selectFriends);
  const recentCreateFriend = useSelector(selectCreateFriend);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const token = useSelector(selectAcessToken);
  const [destinationId, setDestinationId] = useState('');

  useEffect(() => {
    dispatch(actions.fetchFriendsRequest({ token }));
  }, [dispatch, actions, token]);

  const handleCreateFriend = () => {
    if (destinationId) {
      dispatch(
        actions.createFriendRequest({
          destination_id: parseInt(destinationId, 10),
          token,
        }),
      );
    }
    setDestinationId('');
  };

  const handleDeleteFriend = friendId => {
    dispatch(
      actions.deleteFriendRequest({
        friendId,
        token,
      }),
    );
  };

  return (
    <div>
      <h4>FRIENDS</h4>
      <br />
      {/* Enter Player ID:{' '}
      <input
        type="text"
        placeholder="Enter player ID"
        value={destinationId}
        onChange={e => setDestinationId(e.target.value)}
        style={{ marginRight: '10px' }}
        title="Type in Player ID to add as Friend"
      />
      <button
        style={testStyles.buttonBlue}
        onClick={handleCreateFriend}
        title="Click to Add Friend"
      >
        Add Friend
      </button> */}
      {recentCreateFriend && recentCreateFriend.friend.friend_name && (
        <div style={{ fontSize: 12 }}>
          <div style={{ color: '#00b300' }}>
            <i>Last Added: [ID: {recentCreateFriend.friend.destination_id}] </i>
          </div>
        </div>
      )}
      <h4>Friends List:</h4>
      <div style={testStyles.listfriends}>
        {friends && friends.friends && friends.friends.length > 0 ? (
          <ul>
            {friends.friends.map(friend => (
              <div key={friend.destination_id} style={{ fontSize: 12 }}>
                <button
                  style={testStyles.buttonRed}
                  onClick={() => handleDeleteFriend(friend.destination_id)}
                  title="Click to Delete Friend"
                >
                  ×
                </button>
                <b>{`Player ID: ${friend.destination_id}`}</b>
                <div>Name: {friend.friend_name}</div>
              </div>
            ))}
          </ul>
        ) : (
          <p>No friends found.</p>
        )}
      </div>
    </div>
  );
};

export default FriendTest;
