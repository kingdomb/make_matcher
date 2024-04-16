/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useHomePageSlice } from 'app/pages/HomePage/slice';
import {
  selectError,
  selectLoading,
  selectProfile,
  selectUpdateSuccess,
} from 'app/pages/HomePage/slice/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAcessToken,
  selectUserID,
  selectUsername,
} from 'app/pages/AuthPage/slice/selectors';
import avatar from '../../../images/avatar-200x200.png';
import { testStyles } from '../TestComponent/testStyles.ts';

export const UserProfileComponent = () => {
  const dispatch = useDispatch();
  const { actions } = useHomePageSlice();
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const token = useSelector(selectAcessToken);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUsername);
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
    const isConfirmed = window.confirm(
      `Are you sure you want to apply changes to your profile?`,
    );
    if (isConfirmed) {
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
    }
  };

  return (
    <div>
      {profile && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderRadius: '8px',
            backgroundImage:
              'linear-gradient( 50deg, hsl(51deg 100% 45%) 0%, hsl(50deg 100% 45%) 4%, hsl(49deg 100% 45%) 9%, hsl(48deg 100% 46%) 13%, hsl(47deg 100% 46%) 17%, hsl(46deg 100% 46%) 22%, hsl(45deg 100% 46%) 26%, hsl(45deg 100% 46%) 30%, hsl(43deg 100% 47%) 35%, hsl(41deg 100% 47%) 39%, hsl(38deg 100% 48%) 43%, hsl(36deg 100% 48%) 48%, hsl(33deg 100% 49%) 52%, hsl(31deg 100% 49%) 57%, hsl(28deg 100% 50%) 61%, hsl(26deg 100% 50%) 65%, hsl(24deg 100% 50%) 70%, hsl(22deg 100% 50%) 74%, hsl(20deg 100% 50%) 78%, hsl(18deg 100% 50%) 83%, hsl(15deg 100% 50%) 87%, hsl(12deg 100% 50%) 91%, hsl(8deg 100% 50%) 96%, hsl(0deg 100% 50%) 100%',
            fontFamily: 'sans-serif',
            boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff',
            padding: '4rem 5rem',
            marginLeft: '2rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '10rem',
              width: '10rem',
              borderRadius: '15px',
              marginRight: '5rem',
              boxShadow:
                'inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff',
            }}
          >
            <img
              style={{
                height: '8rem',
                width: '8rem',
                padding: '1rem',
              }}
              src={avatar}
              alt="user-avatar"
              className="user-image-placeholder"
            />
          </div>
          <div
            style={{
              margin: '-1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '.5rem',
              padding: '3rem',
              boxShadow:
                'inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff',
              borderRadius: '15px',
            }}
          >
            <div>Name: {profile.profile.display_name}</div>
            <div>Zip code: {profile.profile.zip_code}</div>
            <div>Date of birth: {profile.profile.date_of_birth}</div>
            <div>Intensity: {profile.profile.intensity}</div>
            <div>Skill: {profile.profile.skill}</div>
            <div>Language: {profile.profile.language}</div>
            <div>Days: {profile.profile.days.join(', ')}</div>
            <div>Times: {profile.profile.times.join(', ')}</div>
            <div>Games: {profile.profile.games.join(', ')}</div>
          </div>
        </div>
      )}
    </div>
  );
};

// <h4>PROFILE</h4>
// <br />
// <div>
//   <h4>
//     ID: {userID} Name: {userName}
//   </h4>
// </div>

// <button
//   onClick={handleFetchProfile}
//   disabled={loading}
//   style={testStyles.buttonBlue}
//   title="Click to fetch my Profile"
// >
//   FETCH PROFILE
// </button>
// {!profile && <div>Click button to fetch profile.</div>}
// {profile && (
//   <div>
//     {
//       <div style={{ fontSize: 12 }}>
//         {updateSuccess === true ? (
//           <div style={{ color: '#00b300' }}>Updated successfully</div>
//         ) : (
//           <i>Try to edit profile:</i>
//         )}
//       </div>
//     }
//     <textarea
//       style={{
//         width: '100%',
//         height: '30rem',
//         border: '1px solid #ccc',
//         padding: '10px',
//       }}
//       value={editableProfile}
//       onChange={e => setEditableProfile(e.target.value)}
//       title="Try to edit profile, then click the Update Profile button"
//     />
//     <button
//       onClick={handleUpdateProfile}
//       disabled={loading || !editableProfile}
//       style={testStyles.buttonBlue}
//       title="Click to apply changes to my profile"
//     >
//       UPDATE PROFILE
//     </button>
//   </div>
// )}
// <br />
