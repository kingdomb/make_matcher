/**
 *
 * FriendsList
 *
 */
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
import { testStyles } from '../../components/TestComponent/testStyles.ts';

export function FriendsList(props) {
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
    const isConfirmed = window.confirm(
      `Are you sure you want to unfriend Player ${friendId}?`,
    );
    if (isConfirmed) {
      dispatch(
        actions.deleteFriendRequest({
          friendId,
          token,
        }),
      );
    }
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        borderRadius: '8px',
        backgroundImage:
          'linear-gradient( 50deg, hsl(51deg 100% 45%) 0%, hsl(50deg 100% 45%) 4%, hsl(49deg 100% 45%) 9%, hsl(48deg 100% 46%) 13%, hsl(47deg 100% 46%) 17%, hsl(46deg 100% 46%) 22%, hsl(45deg 100% 46%) 26%, hsl(45deg 100% 46%) 30%, hsl(43deg 100% 47%) 35%, hsl(41deg 100% 47%) 39%, hsl(38deg 100% 48%) 43%, hsl(36deg 100% 48%) 48%, hsl(33deg 100% 49%) 52%, hsl(31deg 100% 49%) 57%, hsl(28deg 100% 50%) 61%, hsl(26deg 100% 50%) 65%, hsl(24deg 100% 50%) 70%, hsl(22deg 100% 50%) 74%, hsl(20deg 100% 50%) 78%, hsl(18deg 100% 50%) 83%, hsl(15deg 100% 50%) 87%, hsl(12deg 100% 50%) 91%, hsl(8deg 100% 50%) 96%, hsl(0deg 100% 50%) 100%',
        fontFamily: 'sans-serif',
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff',
        padding: '2rem 2rem',
        marginLeft: '2rem',
      }}
    >
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '15rem',
          borderRadius: '16px',
          padding: '2rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow:
            'inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff',
          backgroundColor: '#eef2f5',
        }}
      >
        <h2 style={{ paddingBottom: '1rem' }}>FRIENDS LIST</h2>
        <hr />
        <br />
        {recentCreateFriend && recentCreateFriend.friend.friend_name && (
          <div style={{ fontSize: 12 }}>
            <div style={{ color: '#00b300' }}>
              <i>
                Last Added: [ID: {recentCreateFriend.friend.destination_id}]{' '}
              </i>
            </div>
          </div>
        )}
        <div>
          {friends && friends.friends && friends.friends.length > 0 ? (
            <ul>
              {friends.friends.map(friend => (
                <div
                  key={friend.destination_id}
                  style={{
                    fontSize: 'calc( .3rem + 1vw)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <b>Name: </b> {friend.friend_name}
                  </div>
                  <button
                    style={{
                      color: 'red',
                      height: '1rem',
                      width: '1rem',
                      padding: '0',
                      margin: '0',
                      lineHeight: '100%',
                      textAlign: 'top',
                    }}
                    onClick={() => handleDeleteFriend(friend.destination_id)}
                    title="Click to Delete Friend"
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
    </div>
  );
}
