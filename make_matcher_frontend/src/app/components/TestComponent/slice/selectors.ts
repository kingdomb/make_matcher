import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.testComponent || initialState;

export const selectTestComponent = createSelector(
  [selectSlice],
  state => state,
);

export const selectTestStatus = createSelector(
  [selectSlice],
  state => state.status,
);

export const selectTestLoading = createSelector(
  [selectSlice],
  state => state.loading,
);

export const selectTestError = createSelector(
  [selectSlice],
  state => state.error,
);
