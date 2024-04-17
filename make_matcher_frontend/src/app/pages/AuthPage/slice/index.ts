import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { authSaga } from './saga';
import { AuthState, LoginCreds, SignupCreds } from './types';
import { PayloadAction } from '@reduxjs/toolkit';

// export const initialState: AuthState = {
//   username: null,
//   id: null,
//   accessToken: null,
//   refreshToken: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

export const initialState: AuthState = (() => {
  const authData = sessionStorage.getItem('authData');
  if (authData) {
    const { username, id, accessToken, refreshToken } = JSON.parse(authData);
    return {
      username,
      id,
      accessToken,
      refreshToken,
      isAuthenticated: true,
      loading: false,
      error: null,
    };
  }
  return {
    username: null,
    id: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };
})();

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signupRequest: (state, action: PayloadAction<SignupCreds>) => {
      state.loading = true;
    },
    loginRequest: (state, action: PayloadAction<LoginCreds>) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      const { accessToken, refreshToken, username, id } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.username = username;
      state.id = id;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      // store
      sessionStorage.setItem(
        'authData',
        JSON.stringify({
          accessToken,
          refreshToken,
          username,
          id,
        }),
      );
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest: state => {
      state.loading = true;
    },
    logout: state => {
      state.username = null;
      state.id = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;

      // clear
      sessionStorage.removeItem('authData');
    },

    clearError: state => {
      state.error = null;
    },
  },
});

export const { actions: authActions } = slice;

export const useAuthSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAuthSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
