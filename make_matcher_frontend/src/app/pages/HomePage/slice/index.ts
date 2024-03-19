import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { homePageSaga } from './saga';
import { HomePageState, Profile, ProfileUpdatePayload } from './types';

export const initialState: HomePageState = {
  profile: null,
  loading: false,
  error: null,
  updateSuccess: false,
};

const slice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    // someAction(state, action: PayloadAction<any>) {},
    fetchProfileRequest: (state, action: PayloadAction<{ token: string }>) => {
      state.loading = true;
    },
    fetchProfileSuccess: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProfileRequest: (
      state,
      action: PayloadAction<ProfileUpdatePayload>,
    ) => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.loading = false;
      state.error = null;
      state.updateSuccess = true;
    },
    profileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    reset: state => {
      state.profile = null;
      state.loading = false;
      state.error = null;
      state.updateSuccess = false;
    },
  },
});

export const { actions: homePageActions } = slice;

export const useHomePageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: homePageSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useHomePageSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
