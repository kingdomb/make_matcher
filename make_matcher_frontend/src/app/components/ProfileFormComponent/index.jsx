/* eslint-disable no-unused-vars */
/**
 *
 * ProfileFormComponent
 *
 */
import React, { useEffect, useState } from 'react';
import { useHomePageSlice } from 'app/pages/HomePage/slice';
import {
  selectError,
  selectLoading,
  selectProfile,
  selectUpdateSuccess,
} from 'app/pages/HomePage/slice/selectors';
import { selectAcessToken } from '../../pages/AuthPage/slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styles from './ProfileFormComponent.module.scss';
// import { TypedInputComponent } from '../TypedInputComponent';
import { RangeInputComponent } from '../RangeInputComponent';
import { DropdownFormComponent } from '../DropdownFormComponent';
import ProfileTest from '../TestComponent/components/ProfileTest';
import avatar from '../../../images/avatar-200x200.png';
import { useTranslation } from 'react-i18next';
import { getFullYear } from '../../../api-service.js';
import {
  hasMinLength,
  isNotEmpty,
  isEmail,
  isZipCode,
} from '../../../utils/validation.js';
import { LoadingIndicator } from '../LoadingIndicator';
import { RegisteredProfileComponent } from '../RegisteredProfileComponent';
import { InputComponent } from '../InputComponent';

export function ProfileFormComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useHomePageSlice();
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const token = useSelector(selectAcessToken);
  const updateSuccess = useSelector(selectUpdateSuccess);
  const [editableProfile, setEditableProfile] = useState({});
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (profile) {
      setEditableProfile(JSON.stringify(profile, null, 10));
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

  useEffect(() => {
    dispatch(actions.fetchProfileRequest({ token }));
  }, [actions, dispatch, token]);

  const daysOptions = [
    {
      value: 'sunday',
      label: 'Sunday',
    },
    {
      value: 'monday',
      label: 'Monday',
    },
    {
      value: 'tuesday',
      label: 'Tuesday',
    },
    {
      value: 'wednesday',
      label: 'Wednesday',
    },
    {
      value: 'thursday',
      label: 'Thursday',
    },
    {
      value: 'friday',
      label: 'Friday',
    },
    {
      value: 'saturday',
      label: 'Saturday',
    },
  ];

  const timesOptions = [
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
    { value: 'graveyard', label: 'Graveyard' },
  ];

  const gamesOptions = [
    {
      value: 1,
      label: 'Heroes of Might and Magic II: The Succession Wars',
    },
    {
      value: 2,
      label: 'Gunman Chronicles',
    },
    {
      value: 3,
      label: 'Game & Watch Gallery 4',
    },
    {
      value: 4,
      label: 'Warhammer 40,000: Dawn of War II - Chaos Rising',
    },
    {
      value: 5,
      label: 'Mob Rule',
    },
    {
      value: 6,
      label: 'Wii Sports Resort',
    },
    {
      value: 7,
      label: 'Bio Menace',
    },
    {
      value: 8,
      label: 'Warlords II',
    },
    {
      value: 9,
      label: 'Motorhead',
    },
    {
      value: 10,
      label: 'Fallout 4',
    },
    {
      value: 11,
      label: 'Saints Row: The Third',
    },
    {
      value: 12,
      label: 'Star Trek: Armada',
    },
    {
      value: 13,
      label: 'Damocles: Mercenary II',
    },
    {
      value: 14,
      label: 'Lock On: Modern Air Combat',
    },
    {
      value: 15,
      label: 'Lumines: Puzzle Fusion',
    },
    {
      value: 16,
      label: 'Escape from the Planet of the Robot Monsters',
    },
    {
      value: 17,
      label: 'Super Tetris',
    },
    {
      value: 18,
      label: 'Gears of War 2',
    },
    {
      value: 19,
      label: 'Professor Layton and the Last Specter',
    },
    {
      value: 20,
      label: 'Battle Chess',
    },
    {
      value: 21,
      label: 'Mario Party DS',
    },
    {
      value: 22,
      label: 'Bugs Bunny & Taz: Time Busters',
    },
    {
      value: 23,
      label: 'The Sentry',
    },
    {
      value: 24,
      label: 'Undertale',
    },
    {
      value: 25,
      label: 'Burn:Cycle',
    },
    {
      value: 26,
      label: 'Bonanza Bros.',
    },
    {
      value: 27,
      label: 'Mr. DRILLER: Drill Spirits',
    },
    {
      value: 28,
      label: 'Whiplash',
    },
    {
      value: 29,
      label: 'Kirby: Canvas Curse',
    },
    {
      value: 30,
      label: 'Marble Madness',
    },
    {
      value: 31,
      label: 'Silent Hunter II',
    },
    {
      value: 32,
      label: 'Predator 2',
    },
    {
      value: 33,
      label: 'FIFA International Soccer',
    },
    {
      value: 34,
      label: 'Weird Dreams',
    },
    {
      value: 35,
      label: 'Mighty Morphin Power Rangers',
    },
    {
      value: 36,
      label: 'AI: The Somnium Files',
    },
    {
      value: 37,
      label: 'Ghost in the Shell',
    },
    {
      value: 38,
      label: 'Galaga: Destination Earth',
    },
    {
      value: 39,
      label: 'Payday: The Heist',
    },
    {
      value: 40,
      label: 'Machinarium',
    },
    {
      value: 41,
      label: 'The Legacy of Kain Series: Blood Omen 2',
    },
    {
      value: 42,
      label: 'Driver',
    },
    {
      value: 43,
      label: "King's Quest",
    },
    {
      value: 44,
      label: 'European Air War',
    },
    {
      value: 45,
      label: 'Gangsters 2',
    },
    {
      value: 46,
      label: 'Shattered Union',
    },
    {
      value: 47,
      label: 'P.N.03',
    },
    {
      value: 48,
      label: 'Tapper',
    },
    {
      value: 49,
      label: 'Jr. Pac-Man',
    },
  ];

  const handleFetchProfile = () => {
    dispatch(actions.fetchProfileRequest({ token }));
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
      alert('An error occurred.');
    }
  };

  const updateEditableProfile = (field, value) => {
    setEditableProfile(prevProfile => {
      const parsedProfile = JSON.parse(prevProfile);
      parsedProfile.profile[field] = value;
      return JSON.stringify(parsedProfile);
    });
  };

  console.log(editableProfile);

  return (
    <div
      className={styles['form-container']}
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      {!profile && <LoadingIndicator />}

      {profile && (
        <form
          action=""
          className={styles['form']}
          onSubmit={handleUpdateProfile}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '50rem',
            }}
          >
            <div>
              <h2
                className="form-header"
                style={{ color: '#4e4e4e', marginBottom: '1rem' }}
              >
                Type directly into the text area below to update the profile:
              </h2>
              <h3
                className="form-header"
                style={{ color: '#4e4e4e', marginBottom: '1rem' }}
              >
                (Scroll further to see a sample profile update form)
              </h3>
              <ProfileTest />
            </div>
            <div>
              {notification ? (
                <div>
                  <b>{notification}</b>
                </div>
              ) : (
                <div>No new notifications</div>
              )}
            </div>
          </div>
          <hr
            style={{
              height: '1px',
              border: 'none',
              backgroundColor: '#4e4e4e',
              marginBottom: '3rem',
            }}
          />
          <div
            className="updating-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <RegisteredProfileComponent
              label={'User Name:'}
              data={profile.profile.display_name}
            />
            <InputComponent
              id="display_name"
              type="text"
              name="username"
              placeholder="Enter New User Name"
              onClick={(value, field) => {
                updateEditableProfile(field, value);
                handleUpdateProfile();
              }}
              containerClassName={styles['profile']}
              inputClassName={styles['profile-input']}
              labelClassName={styles['profile-label']}
              updateClassName={styles['update-container']}
              buttonClassName={styles['profile-button']}
              iconClassName={styles['profile-button-icon']}
              errorClassName={styles['profile-error']}
            />
          </div>
          <div
            className="updating-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <RegisteredProfileComponent
              label={'Zip Code:'}
              data={profile.profile.zip_code}
            />
            <InputComponent
              id="zip_code"
              type="text"
              name="zip-code"
              pattern="[0-9]{5}"
              title="Five digit zip code"
              placeholder="Enter New Zip Code"
              onClick={(value, field) => {
                updateEditableProfile(field, value);
                handleUpdateProfile();
              }}
              containerClassName={styles['profile']}
              inputClassName={styles['profile-input']}
              labelClassName={styles['profile-label']}
              updateClassName={styles['update-container']}
              buttonClassName={styles['profile-button']}
              iconClassName={styles['profile-button-icon']}
              errorClassName={styles['profile-error']}
            />
          </div>
          <div
            className="updating-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <RegisteredProfileComponent
              label={'Date of Birth:'}
              data={profile.profile.date_of_birth}
            />
            <InputComponent
              id="date_of_birth"
              type="text"
              name="birth-year"
              title="Year, day, and month of birth"
              placeholder="Enter New DOB: ex..YYYY-MM-DD"
              onClick={(value, field) => {
                updateEditableProfile(field, value);
                handleUpdateProfile();
              }}
              containerClassName={styles['profile']}
              inputClassName={styles['profile-input']}
              labelClassName={styles['profile-label']}
              updateClassName={styles['update-container']}
              buttonClassName={styles['profile-button']}
              iconClassName={styles['profile-button-icon']}
              errorClassName={styles['profile-error']}
            />
          </div>
          <div
            className="updating-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <RegisteredProfileComponent
              label={'Intensity:'}
              data={profile.profile.intensity}
            />
            <RangeInputComponent
              id="intensity"
              type="range"
              defaultValue="0"
              min="1"
              max="10"
              title="Game intensity preference"
              // onClick={e => handleEnteredValues('intensity', e.target.value)}
              // error={
              //   intensityIsInvalid && 'Please slide to a preferred intensity!'
              // }
              containerClassName={styles['container']}
              rangeClassName={styles['range']}
              inputClassName={styles['range-input']}
              labelClassName={styles['range-label']}
              errorClassName={styles['range-error']}
              updateClassName={styles['update-container']}
              buttonClassName={styles['profile-button']}
              iconClassName={styles['profile-button-icon']}
            />
          </div>
          <div
            className="updating-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <RegisteredProfileComponent
              label={'Skill:'}
              data={profile.profile.skill}
            />
            <RangeInputComponent
              id="skill"
              type="range"
              defaultValue="0"
              min="1"
              max="10"
              title="Game skill preference"
              // onClick={e => handleEnteredValues('skill', e.target.value)}
              // error={
              //   skillIsInvalid && 'Please enter a valid four digit birth year!'
              // }
              containerClassName={styles['container']}
              rangeClassName={styles['range']}
              inputClassName={styles['range-input']}
              labelClassName={styles['range-label']}
              errorClassName={styles['range-error']}
              updateClassName={styles['update-container']}
              buttonClassName={styles['profile-button']}
              iconClassName={styles['profile-button-icon']}
              // outputValue={enteredValues.skill}
            />
          </div>
          <div
            className="updating-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <RegisteredProfileComponent
              label={'Profanity:'}
              data={profile.profile.language}
            />
            <RangeInputComponent
              id="language"
              type="range"
              defaultValue="0"
              min="1"
              max="10"
              // title="Game profanity preference"
              // onClick={e => handleEnteredValues('skill', e.target.value)}
              // error={
              //   skillIsInvalid && 'Please enter a valid four digit birth year!'
              // }
              containerClassName={styles['container']}
              rangeClassName={styles['range']}
              inputClassName={styles['range-input']}
              labelClassName={styles['range-label']}
              errorClassName={styles['range-error']}
              updateClassName={styles['update-container']}
              buttonClassName={styles['profile-button']}
              iconClassName={styles['profile-button-icon']}
              // outputValue={enteredValues.skill}
            />
          </div>
          <div
            className="updating-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '4rem 0',
            }}
          >
            <RegisteredProfileComponent
              label={'Days:'}
              // data={profile.profile.days.join(' ')}
              data={
                profile.profile.days &&
                profile.profile.days.length !== 0 &&
                profile.profile.days.join(' ')
              }
            />
            <DropdownFormComponent
              label="Choose a day:"
              options={daysOptions}
              // initialValue={enteredValues.days}
              // onChange={value => handleDropdownChange('days', value)}
              containerClassName={styles['dropdown']}
              updateClassName={styles['update-container']}
              buttonClassName={styles['profile-button']}
              iconClassName={styles['profile-button-icon']}
              inputClassName={styles['dropdown-input']}
              labelClassName={styles['dropdown-label']}
            />
          </div>
          <div
            className="updating-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '4rem 0',
            }}
          >
            <RegisteredProfileComponent
              label={'Times:'}
              // data={profile.profile.times.join('  ')}
              data={
                profile.profile.times &&
                profile.profile.times.length !== 0 &&
                profile.profile.times.join('  ')
              }
            />
            <DropdownFormComponent
              label="Choose a time:"
              options={timesOptions}
              // initialValue={enteredValues.times}
              // onChange={value => handleDropdownChange('days', value)}
              containerClassName={styles['dropdown']}
              updateClassName={styles['update-container']}
              buttonClassName={styles['profile-button']}
              iconClassName={styles['profile-button-icon']}
              inputClassName={styles['dropdown-input']}
              labelClassName={styles['dropdown-label']}
            />
          </div>
          <div
            className="updating-container"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '4rem 0',
            }}
          >
            <RegisteredProfileComponent
              label={'Games:'}
              data={gamesOptions}
              // gamesData={profile.profile.games}
              gamesData={
                profile.profile.games &&
                profile.profile.games.length !== 0 &&
                profile.profile.games.join(', ')
              }
            />
            <DropdownFormComponent
              label="Choose a time:"
              options={gamesOptions}
              // initialValue={enteredValues.games}
              // onChange={value => handleDropdownChange('days', value)}
              containerClassName={styles['dropdown']}
              updateClassName={styles['update-container']}
              buttonClassName={styles['profile-button']}
              iconClassName={styles['profile-button-icon']}
              inputClassName={styles['dropdown-input']}
              labelClassName={styles['dropdown-label']}
            />
          </div>
        </form>
      )}
    </div>
  );
}
