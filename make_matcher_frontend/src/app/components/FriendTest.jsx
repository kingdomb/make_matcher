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
import { testStyles } from './TestComponent/testStyles';

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
      <h4>FRIENDS Test Component</h4>
      <br />
      Enter Friend ID:{' '}
      <input
        type="text"
        placeholder="Enter destination ID"
        value={destinationId}
        onChange={e => setDestinationId(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button style={testStyles.buttonBlue} onClick={handleCreateFriend}>
        Add Friend
      </button>
      {recentCreateFriend && recentCreateFriend.friend.friend_name && (
        <div>
          Last created friend: {recentCreateFriend.friend.friend_name} [ID:{' '}
          {recentCreateFriend.friend.destination_id}]{' '}
        </div>
      )}
      <br />
      <br />
      <h4>Friends List:</h4>
      <div style={testStyles.list}>
        {friends && friends.friends && friends.friends.length > 0 ? (
          <ul>
            {friends.friends.map(friend => (
              <div key={friend.destination_id}>
                {`Friend ID: ${friend.destination_id}, Name: ${friend.friend_name}`}
                <button
                  style={testStyles.buttonRed}
                  onClick={() => handleDeleteFriend(friend.destination_id)}
                >
                  X
                </button>
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
