import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.homePage || initialState;

export const selectHomePage = createSelector([selectSlice], state => state);

export const selectProfile = createSelector(
  [selectSlice],
  state => state.profile,
);
export const selectLoading = createSelector(
  [selectSlice],
  state => state.loading,
);
export const selectUpdateSuccess = createSelector(
  [selectSlice],
  state => state.updateSuccess,
);

/*-- Friend Requests --*/

export const selectFriendRequests = createSelector(
  [selectSlice],
  state => state.friendRequests,
);

export const selectRecentFriendRequest = createSelector(
  [selectSlice],
  state => state.recentFriendRequest,
);

/*-- Friends --*/

export const selectFriends = createSelector(
  [selectSlice],
  state => state.friends,
);

export const selectCreateFriend = createSelector(
  [selectSlice],
  state => state.recentCreateFriend,
);

/*--  --*/
/*--  --*/
/*--  --*/

export const selectError = createSelector([selectSlice], state => state.error);
