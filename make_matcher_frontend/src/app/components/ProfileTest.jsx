import { useHomePageSlice } from 'app/pages/HomePage/slice';
import {
  selectError,
  selectLoading,
  selectProfile,
  selectUpdateSuccess,
} from 'app/pages/HomePage/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { testStyles } from './TestComponent';
import { selectAcessToken } from 'app/pages/AuthPage/slice/selectors';

const ProfileTest = () => {
  const dispatch = useDispatch();
  const { actions } = useHomePageSlice();
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const token = useSelector(selectAcessToken);
  const updateSuccess = useSelector(selectUpdateSuccess);
  const [editableProfile, setEditableProfile] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (profile) {
      setEditableProfile(JSON.stringify(profile, null, 2));
      setNotification('Profile fetched successfully.');
    }
  }, [profile]);

  useEffect(() => {
    if (updateSuccess) {
      setNotification('Profile updated successfully.');
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (error) {
      setNotification(`Error: ${error.errorMessage}`);
    }
  }, [error]);

  const handleFetchProfile = () => {
    setNotification('');
    dispatch(actions.fetchProfileRequest({ token }));
    setNotification('Fetching profile...');
  };

  const handleUpdateProfile = () => {
    setNotification('');
    let updatedProfileData;
    try {
      updatedProfileData = JSON.parse(editableProfile);
      dispatch(
        actions.updateProfileRequest({
          profileData: updatedProfileData,
          token,
        }),
      );
    } catch (e) {
      setNotification('Invalid JSON format');
    }
  };

  return (
    <div>
      <br />
      <h4>Test Profile Fetch and Update</h4>
      <button
        onClick={handleFetchProfile}
        disabled={loading}
        style={testStyles.button}
      >
        Fetch Profile
      </button>

      {loading && <p>Loading...</p>}
      <p style={error ? testStyles.errorText : testStyles.successText}>
        {notification}
      </p>
      {!profile && <div>Click button to fetch profile.</div>}
      {profile && (
        <div>
          <textarea
            style={{
              width: '100%',
              height: '200px',
              border: '1px solid #ccc',
              padding: '10px',
            }}
            value={editableProfile}
            onChange={e => setEditableProfile(e.target.value)}
          />
        </div>
      )}
      <button
        onClick={handleUpdateProfile}
        disabled={loading || !editableProfile}
        style={testStyles.button}
      >
        Update Profile
      </button>
      <br />
    </div>
  );
};

export default ProfileTest;
