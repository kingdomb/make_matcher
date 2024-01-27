import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.testComponent || initialState;

export const selectTestComponent = createSelector(
  [selectSlice],
  state => state,
);
