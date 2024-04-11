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
import { testStyles } from '../testStyles';

const GroupsTest = () => {
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
    <div>
      <h4>GROUPS</h4>
      <br />
      Enter Group Name:{' '}
      <div>
        <input
          value={newGroupName}
          onChange={e => setNewGroupName(e.target.value)}
          placeholder="New Group Name"
          title="Type desired group name"
        />
        <button
          style={testStyles.buttonBlue}
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
  );
};

export default GroupsTest;

/////////
