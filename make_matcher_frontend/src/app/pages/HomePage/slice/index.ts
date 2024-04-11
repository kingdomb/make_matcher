import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { homePageSaga } from './saga';
import {
  AddGroupMemberPayload,
  CreateFriendPayload,
  CreateFriendRequestPayload,
  CreateGroupPayload,
  DeleteFriendPayload,
  DeleteFriendRequestPayload,
  DeleteGroupPayload,
  FetchAllGroupsPayload,
  FetchFriendRequestsPayload,
  FetchFriendsPayload,
  FetchMatchesPayload,
  FetchUserGroupsPayload,
  Friend,
  FriendRequest,
  Group,
  HomePageState,
  Match,
  Profile,
  ProfileUpdatePayload,
  RejectMatchPayload,
  RemoveGroupMemberPayload,
} from './types';

export const initialState: HomePageState = {
  profile: null,
  loading: false,
  error: null,
  updateSuccess: null,
  /*-- Friend Requests --*/
  friendRequests: null,
  recentFriendRequest: null,
  recentFriendRequestID: null,
  /*-- Friends --*/
  friends: null,
  recentCreateFriend: null,
  /*-- Match --*/
  matches: null,
  /*-- Group --*/
  allGroups: null,
  userGroups: null,
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
    recentFriendRequestID: (state, action) => {
      state.recentFriendRequestID = action.payload;
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

    /*-- Match --*/

    fetchMatchesRequest: (
      state,
      action: PayloadAction<FetchMatchesPayload>,
    ) => {
      state.loading = true;
    },
    fetchMatchesSuccess: (state, action: PayloadAction<Match[]>) => {
      state.matches = action.payload;
      state.loading = false;
      state.error = null;
    },
    rejectMatchRequest: (state, action: PayloadAction<RejectMatchPayload>) => {
      state.loading = true;
    },
    rejectMatchSuccess: (state, action: PayloadAction<number>) => {
      state.matches =
        state.matches?.filter(match => match.id !== action.payload) || null;
      state.loading = false;
      state.error = null;
    },
    matchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    /*-- Group --*/

    fetchAllGroupsRequest: (
      state,
      action: PayloadAction<FetchAllGroupsPayload>,
    ) => {
      state.loading = true;
    },
    fetchAllGroupsSuccess: (state, action: PayloadAction<Group[]>) => {
      state.allGroups = action.payload;
      state.loading = false;
    },
    fetchUserGroupsRequest: (
      state,
      action: PayloadAction<FetchUserGroupsPayload>,
    ) => {
      state.loading = true;
    },
    fetchUserGroupsSuccess: (state, action: PayloadAction<Group[]>) => {
      state.userGroups = action.payload;
      state.loading = false;
    },
    createGroupRequest: (state, action: PayloadAction<CreateGroupPayload>) => {
      state.loading = true;
    },
    createGroupSuccess: (state, action: PayloadAction<Group>) => {
      state.loading = false;
    },
    deleteGroupRequest: (state, action: PayloadAction<DeleteGroupPayload>) => {
      state.loading = true;
    },
    deleteGroupSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
    },
    addGroupMemberRequest: (
      state,
      action: PayloadAction<AddGroupMemberPayload>,
    ) => {
      state.loading = true;
    },
    addGroupMemberSuccess: state => {
      state.loading = false;
    },
    removeGroupMemberRequest: (
      state,
      action: PayloadAction<RemoveGroupMemberPayload>,
    ) => {
      state.loading = true;
    },
    removeGroupMemberSuccess: state => {
      state.loading = false;
    },
    groupFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

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
