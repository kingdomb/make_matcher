import { useHomePageSlice } from 'app/pages/HomePage/slice';
import {
  selectError,
  selectLoading,
  selectProfile,
  selectUpdateSuccess,
} from 'app/pages/HomePage/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAcessToken } from 'app/pages/AuthPage/slice/selectors';
import { testStyles } from './TestComponent/testStyles';

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
    if (token) {
      dispatch(actions.fetchProfileRequest({ token }));
    }
  }, [token]);

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
      <h4>PROFILE Test Component</h4>
      <br />
      <button
        onClick={handleFetchProfile}
        disabled={loading}
        style={testStyles.buttonBlue}
      >
        FETCH PROFILE
      </button>

      {!profile && <div>Click button to fetch profile.</div>}
      {profile && (
        <div>
          Try edit profile:
          <textarea
            style={{
              width: '100%',
              height: '160px',
              border: '1px solid #ccc',
              padding: '10px',
            }}
            value={editableProfile}
            onChange={e => setEditableProfile(e.target.value)}
          />
          <button
            onClick={handleUpdateProfile}
            disabled={loading || !editableProfile}
            style={testStyles.buttonBlue}
          >
            UPDATE PROFILE
          </button>
        </div>
      )}
      <br />
    </div>
  );
};

export default ProfileTest;
