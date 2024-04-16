/**
 *
 * GroupsList
 *
 */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHomePageSlice } from 'app/pages/HomePage/slice';
import {
  selectAllGroups,
  selectLoading,
  selectError,
  selectUserGroups,
} from 'app/pages/HomePage/slice/selectors';
import {
  selectAcessToken,
  selectUserID,
} from 'app/pages/AuthPage/slice/selectors';
import { testStyles } from '../TestComponent/testStyles.ts';

export function GroupsList(props) {
  const dispatch = useDispatch();
  const { actions } = useHomePageSlice();
  const allGroups = useSelector(selectAllGroups);
  const myGroups = useSelector(selectUserGroups);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const userID = useSelector(selectUserID);
  const token = useSelector(selectAcessToken);
  const [newGroupName, setNewGroupName] = useState('');

  useEffect(() => {
    dispatch(actions.fetchAllGroupsRequest({ token }));
    dispatch(actions.fetchUserGroupsRequest({ token }));
  }, [dispatch, actions, token]);

  const handleCreateGroup = () => {
    if (!newGroupName) {
      return;
    }
    const isConfirmed = window.confirm(
      `Are you sure you want to create new group "${newGroupName}"?`,
    );
    if (isConfirmed && newGroupName) {
      dispatch(actions.createGroupRequest({ name: newGroupName, token }));
    }
  };

  const handleDeleteGroup = (groupId, groupName) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete group "${groupName}"?`,
    );
    if (isConfirmed) {
      dispatch(actions.deleteGroupRequest({ groupId, token }));
    }
  };

  const handleAddGroupMember = (groupId, groupName) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to join group "${groupName}"?`,
    );
    if (isConfirmed) {
      dispatch(
        actions.addGroupMemberRequest({
          groupId,
          token,
        }),
      );
    }
  };

  const handleRemoveGroupMember = (groupId, groupName) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to leave group "${groupName}"?`,
    );
    if (isConfirmed) {
      dispatch(actions.removeGroupMemberRequest({ groupId, token }));
    }
  };

  return (
    <div
      style={{
        marginRight: '2rem',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundImage:
          'linear-gradient( 50deg, hsl(51deg 100% 45%) 0%, hsl(50deg 100% 45%) 4%, hsl(49deg 100% 45%) 9%, hsl(48deg 100% 46%) 13%, hsl(47deg 100% 46%) 17%, hsl(46deg 100% 46%) 22%, hsl(45deg 100% 46%) 26%, hsl(45deg 100% 46%) 30%, hsl(43deg 100% 47%) 35%, hsl(41deg 100% 47%) 39%, hsl(38deg 100% 48%) 43%, hsl(36deg 100% 48%) 48%, hsl(33deg 100% 49%) 52%, hsl(31deg 100% 49%) 57%, hsl(28deg 100% 50%) 61%, hsl(26deg 100% 50%) 65%, hsl(24deg 100% 50%) 70%, hsl(22deg 100% 50%) 74%, hsl(20deg 100% 50%) 78%, hsl(18deg 100% 50%) 83%, hsl(15deg 100% 50%) 87%, hsl(12deg 100% 50%) 91%, hsl(8deg 100% 50%) 96%, hsl(0deg 100% 50%) 100%',
        fontFamily: 'sans-serif',
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff',
        padding: '1.5rem 1.8rem',
        height: '100%',
        width: '40%',
      }}
    >
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '20rem',
          borderRadius: '16px',
          padding: '2rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow:
            'inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff',
          backgroundColor: '#eef2f5',
        }}
      >
        <h2 style={{ paddingBottom: '1rem' }}>GROUPS</h2>
        <hr />
        <br />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '60%' }}
          >
            <label
              style={{
                position: 'absolute',
                fontSize: 'calc( .1rem + .8vw)',
                left: '15px',
                transform: 'translateY(-50%)',
                color: 'rgb(124, 124, 124)',
                pointerEvents: 'none',
                lineHeight: '1.1rem',
                borderRadius: '15px',
                backgroundColor: '#eef2f5',
                padding: '0rem 0.5rem',
                boxShadow:
                  '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff',
              }}
              htmlFor="group-name"
            >
              {' '}
              Enter Group Name:{' '}
            </label>
            <input
              value={newGroupName}
              onChange={e => setNewGroupName(e.target.value)}
              placeholder="New Group Name"
              title="Type desired group name"
              id="group-name"
              style={{
                width: '100%',
                height: '3.5rem',
                lineHeight: '2.5rem',
                borderRadius: '10px',
                textIndent: '12px',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '1rem',
                boxShadow:
                  'inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff',
              }}
            />
          </div>
          <button
            style={{ fontSize: 'calc( .1rem + .8vw)' }}
            onClick={handleCreateGroup}
            title="Click to Create New Group"
          >
            Create Group
          </button>
        </div>
        <div style={testStyles.listgroups}>
          <h4>My Groups:</h4>
          {myGroups && myGroups.length > 0 ? (
            myGroups.map(group => (
              <div key={group.id} style={{ fontSize: 11 }}>
                {group.name}
              </div>
            ))
          ) : (
            <p>No membership.</p>
          )}
          <hr
            style={{
              margin: '10px 0',
              border: 'none',
              borderBottom: '1px solid #e0e0e0',
            }}
          />
          <h4>All Groups:</h4>
          {allGroups &&
            allGroups.map(group => (
              <div key={group.id} style={{ textAlign: 'left' }}>
                <div>
                  {/* Delete group */}
                  <button
                    style={testStyles.buttonRed}
                    onClick={() => handleDeleteGroup(group.id, group.name)}
                    title="Click to Delete Group"
                  >
                    ×
                  </button>
                  <u>{group.name}</u>
                  {!group.users.some(user => user.id === userID) && (
                    <button
                      style={testStyles.buttonGreen}
                      onClick={() => handleAddGroupMember(group.id, group.name)}
                      title="Click to Join Group"
                    >
                      Join
                    </button>
                  )}
                </div>
                <div style={{ fontSize: 12 }}>Group ID: {group.id}</div>
                <div style={{ fontSize: 12 }}>Members:</div>
                <div>
                  {group.users.length === 0 && (
                    <div style={{ fontSize: 11 }}>No members</div>
                  )}
                  {group.users.map(user => (
                    <div key={user.id} style={{ fontSize: 11 }}>
                      {/* Delete member from group */}
                      <b>Player ID: {user.id}</b>

                      {userID === user.id && (
                        <button
                          style={testStyles.buttonRed}
                          onClick={() =>
                            handleRemoveGroupMember(group.id, group.name)
                          }
                          title="Click to Leave Group"
                        >
                          Leave
                        </button>
                      )}
                      <div>
                        <i>
                          {'   '}Name: {user.username}
                        </i>
                      </div>
                    </div>
                  ))}
                </div>
                <hr
                  style={{
                    margin: '10px 0',
                    border: 'none',
                    borderBottom: '1px solid #e0e0e0',
                  }}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
