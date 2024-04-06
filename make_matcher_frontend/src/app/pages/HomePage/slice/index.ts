import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { homePageSaga } from './saga';
import {
  CreateFriendPayload,
  CreateFriendRequestPayload,
  DeleteFriendPayload,
  DeleteFriendRequestPayload,
  FetchFriendRequestsPayload,
  FetchFriendsPayload,
  Friend,
  FriendRequest,
  HomePageState,
  Profile,
  ProfileUpdatePayload,
} from './types';

export const initialState: HomePageState = {
  profile: null,
  loading: false,
  error: null,
  updateSuccess: false,
  /*-- Friend Requests --*/
  friendRequests: null,
  recentFriendRequest: null,
  /*-- Friends --*/
  friends: null,
  recentCreateFriend: null,
  /*--  --*/
  /*--  --*/

  /*--  --*/
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

    /*-- Friend Requests --*/

    fetchFriendRequestsRequest: (
      state,
      action: PayloadAction<FetchFriendRequestsPayload>,
    ) => {
      state.loading = true;
    },
    fetchFriendRequestsSuccess: (
      state,
      action: PayloadAction<FriendRequest[]>,
    ) => {
      state.friendRequests = action.payload;
      state.loading = false;
      state.error = null;
    },
    createFriendRequestRequest: (
      state,
      action: PayloadAction<CreateFriendRequestPayload>,
    ) => {
      state.loading = true;
    },
    createFriendRequestSuccess: (state, action) => {
      state.recentFriendRequest = action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteFriendRequestRequest: (
      state,
      action: PayloadAction<DeleteFriendRequestPayload>,
    ) => {
      state.loading = true;
    },
    deleteFriendRequestSuccess: (state, action: PayloadAction<number>) => {
      state.friendRequests =
        state.friendRequests?.filter(
          request => request.id !== action.payload,
        ) || null;
      state.loading = false;
      state.error = null;
    },
    friendRequestFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    /*-- Friends --*/

    fetchFriendsRequest: (
      state,
      action: PayloadAction<FetchFriendsPayload>,
    ) => {
      state.loading = true;
    },
    fetchFriendsSuccess: (state, action: PayloadAction<Friend[]>) => {
      state.friends = action.payload;
      state.loading = false;
      state.error = null;
    },
    createFriendRequest: (
      state,
      action: PayloadAction<CreateFriendPayload>,
    ) => {
      state.loading = true;
    },
    createFriendSuccess: (state, action) => {
      state.recentCreateFriend = action.payload;
      state.loading = false;
    },
    deleteFriendRequest: (
      state,
      action: PayloadAction<DeleteFriendPayload>,
    ) => {
      state.loading = true;
    },
    deleteFriendSuccess: (state, action: PayloadAction<number>) => {
      if (!Array.isArray(state.friends)) {
        state.friends = [];
      } else {
        state.friends = state.friends.filter(
          friend => friend.id !== action.payload,
        );
      }
      state.loading = false;
      state.error = null;
    },
    friendFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    /*--  --*/

    /*--  --*/

    /*--  --*/

    /*--  --*/

    /*--  --*/

    /*-- General --*/

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
