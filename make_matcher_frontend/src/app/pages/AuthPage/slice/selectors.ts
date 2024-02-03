import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.auth || initialState;

export const selectAuth = createSelector([selectSlice], state => state);

export const selectUsername = createSelector(
  [selectSlice],
  state => state.username,
);

export const selectAcessToken = createSelector(
  [selectSlice],
  state => state.accessToken,
);

export const selectRefreshToken = createSelector(
  [selectSlice],
  state => state.refreshToken,
);

export const selectIsAuthenticated = createSelector(
  [selectSlice],
  state => state.isAuthenticated,
);

export const selectLoading = createSelector(
  [selectSlice],
  state => state.loading,
);

export const selectError = createSelector([selectSlice], state => state.error);
