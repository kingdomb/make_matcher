import { call, put, takeLatest } from 'redux-saga/effects';
import { homePageActions as actions } from '.';
/*-- Profile --*/
import { apiGetProfile, apiPostProfile } from 'api-service';
/*-- Friend Requests --*/
import {
  apiGetFriendRequests,
  apiCreateFriendRequest,
  apiDeleteFriendRequest,
} from 'api-service';
/*-- Friend --*/
import { apiGetFriends, apiCreateFriend, apiDeleteFriend } from 'api-service';
/*-- Match --*/
import { apiGetMatches, apiRejectMatch } from 'api-service';
/*-- Group --*/
import { getErrorMessage } from 'api-service';

// function* doSomething() {}
function* fetchProfile(action) {
  try {
    const token = action.payload.token;
    // console.log('*** checking token:', token);
    const response = yield call(apiGetProfile, token);
    console.log('Profile data: ', response.data);
    yield put(actions.fetchProfileSuccess(response.data));
  } catch (error) {
    const getError = getErrorMessage(error);
    yield put(actions.profileFailure(getError));
  }
}

function* updateProfile(action) {
  try {
    const { profileData, token } = action.payload;
    const response = yield call(apiPostProfile, profileData, token);
    console.log('Profile update response: ', response.data);
    yield put(actions.updateProfileSuccess(response.data));
  } catch (error) {
    const getError = getErrorMessage(error);
    yield put(actions.profileFailure(getError));
  }
}

/*-- Friend Requests --*/

function* fetchFriendRequests(action) {
  try {
    const { token } = action.payload;
    const response = yield call(apiGetFriendRequests, token);
    console.log('Fetch friend request response: ', response.data);
    yield put(
      actions.fetchFriendRequestsSuccess(response.data.friend_requests),
    );
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    yield put(actions.friendRequestFailure(errorMsg));
  }
}

function* createFriendRequest(action) {
  try {
    const { requestee_id, token } = action.payload;
    console.log('Create friend requestee ID: ', requestee_id);
    const response = yield call(
      apiCreateFriendRequest,
      { requestee_id },
      token,
    );
    console.log('Create friend request response: ', response.data);
    yield put(actions.createFriendRequestSuccess(response.data.friend_request));
    yield put(actions.fetchFriendRequestsRequest({ token }));
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    yield put(actions.friendRequestFailure(errorMsg));
  }
}

function* deleteFriendRequest(action) {
  try {
    const { requestId, token } = action.payload;
    console.log('Delete friend request ID: ', requestId);
    const response = yield call(apiDeleteFriendRequest, requestId, token);
    console.log('Delete friend request response: ', response.data);
    yield put(actions.deleteFriendRequestSuccess(requestId));
    yield put(actions.fetchFriendRequestsRequest({ token }));
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    yield put(actions.friendRequestFailure(errorMsg));
  }
}

/*-- Friends --*/

function* fetchFriends(action) {
  try {
    const { token } = action.payload;
    const response = yield call(apiGetFriends, token);
    console.log('Fetch friends response: ', response.data);
    yield put(actions.fetchFriendsSuccess(response.data));
  } catch (error) {
    yield put(actions.friendFailure(getErrorMessage(error)));
  }
}

function* createFriend(action) {
  try {
    const { destination_id, token } = action.payload;
    console.log('Create friend destination ID: ', destination_id);
    const response = yield call(apiCreateFriend, { destination_id }, token);
    console.log('Create friend response: ', response.data);
    yield put(actions.createFriendSuccess(response.data));
    yield put(actions.fetchFriendsRequest({ token }));
  } catch (error) {
    yield put(actions.friendFailure(getErrorMessage(error)));
  }
}

function* deleteFriend(action) {
  try {
    const { friendId, token } = action.payload;
    console.log('Delete friend ID: ', friendId);
    const response = yield call(apiDeleteFriend, friendId, token);
    console.log('Delete friend response: ', response.data);
    yield put(actions.deleteFriendSuccess(friendId));
    yield put(actions.fetchFriendsRequest({ token }));
  } catch (error) {
    yield put(actions.friendFailure(getErrorMessage(error)));
  }
}

/*-- Match --*/

function* fetchMatches(action) {
  try {
    const { token } = action.payload;
    const response = yield call(apiGetMatches, token);
    yield put(actions.fetchMatchesSuccess(response.data.matches));
  } catch (error) {
    yield put(actions.matchFailure(getErrorMessage(error)));
  }
}

function* rejectMatch(action) {
  try {
    const { matchId, token } = action.payload;
    const response = yield call(apiRejectMatch, matchId, token);
    if (response.data.message === 'Success') {
      yield put(actions.rejectMatchSuccess(matchId));
    } else {
      throw new Error('Match rejection failed');
    }
  } catch (error) {
    yield put(actions.matchFailure(getErrorMessage(error)));
  }
}

/*-- Group --*/

/*-- Listerners --*/

export function* homePageSaga() {
  // yield takeLatest(actions.someAction.type, doSomething);
  yield takeLatest(actions.fetchProfileRequest.type, fetchProfile);
  yield takeLatest(actions.updateProfileRequest.type, updateProfile);
  /*-- Friend Requests --*/
  yield takeLatest(
    actions.fetchFriendRequestsRequest.type,
    fetchFriendRequests,
  );
  yield takeLatest(
    actions.createFriendRequestRequest.type,
    createFriendRequest,
  );
  yield takeLatest(
    actions.deleteFriendRequestRequest.type,
    deleteFriendRequest,
  );
  /*-- Friends --*/
  yield takeLatest(actions.fetchFriendsRequest.type, fetchFriends);
  yield takeLatest(actions.createFriendRequest.type, createFriend);
  yield takeLatest(actions.deleteFriendRequest.type, deleteFriend);

  /*-- Match --*/
  yield takeLatest(actions.fetchMatchesRequest.type, fetchMatches);
  yield takeLatest(actions.rejectMatchRequest.type, rejectMatch);

  /*-- Group --*/
}
