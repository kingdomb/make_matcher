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
import { testStyles } from './TestComponent/testStyles';

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
    if (newGroupName) {
      dispatch(actions.createGroupRequest({ name: newGroupName, token }));
    }
  };

  const handleDeleteGroup = groupId => {
    dispatch(actions.deleteGroupRequest({ groupId, token }));
  };

  const handleAddGroupMember = groupId => {
    dispatch(
      actions.addGroupMemberRequest({
        groupId,
        token,
      }),
    );
  };

  const handleRemoveGroupMember = groupId => {
    dispatch(actions.removeGroupMemberRequest({ groupId, token }));
  };

  return (
    <div>
      <h4>GROUPS Test Component</h4>
      <br />
      Enter Group Name:{' '}
      <div>
        <input
          value={newGroupName}
          onChange={e => setNewGroupName(e.target.value)}
          placeholder="New Group Name"
        />
        <button style={testStyles.buttonBlue} onClick={handleCreateGroup}>
          Create Group
        </button>
      </div>
      <div style={testStyles.listgroups}>
        <h3>My Groups:</h3>
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
        <h3>All Groups:</h3>
        {allGroups &&
          allGroups.map(group => (
            <div key={group.id} style={{ textAlign: 'left' }}>
              <div>
                {/* Delete group */}
                <button
                  style={testStyles.buttonRed}
                  onClick={() => handleDeleteGroup(group.id)}
                >
                  ×
                </button>
                <u>{group.name}</u>

                {/* <button
                  style={testStyles.buttonGreen}
                  onClick={() => handleAddGroupMember(group.id)}
                >
                  Join
                </button> */}
                {!group.users.some(user => user.id === userID) && (
                  <button
                    style={testStyles.buttonGreen}
                    onClick={() => handleAddGroupMember(group.id)}
                  >
                    Join
                  </button>
                )}
              </div>
              <div style={{ fontSize: 12 }}>Members:</div>
              <div>
                {group.users.length === 0 && (
                  <div style={{ fontSize: 11 }}>No members</div>
                )}
                {group.users.map(user => (
                  <div key={user.id} style={{ fontSize: 11 }}>
                    {/* Delete member from group */}
                    ID: {user.id}, Name: {user.username}{' '}
                    {userID === user.id && (
                      <button
                        style={testStyles.buttonRed}
                        onClick={() =>
                          handleRemoveGroupMember(group.id, user.id)
                        }
                      >
                        Leave
                      </button>
                    )}
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
