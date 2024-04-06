import { call, put, takeLatest } from 'redux-saga/effects';
import { homePageActions as actions } from '.';
import { apiGetProfile, apiPostProfile } from 'api-service';
import {
  apiGetFriendRequests,
  apiCreateFriendRequest,
  apiDeleteFriendRequest,
} from 'api-service';
import { getErrorMessage } from 'api-service';
import { request } from 'http';

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
    if (response.data.success) {
      yield put(actions.fetchFriendRequestsRequest({ token }));
    } else {
      throw new Error('Delete operation failed');
    }
  } catch (error) {
    const errorMsg = getErrorMessage(error);
    yield put(actions.friendRequestFailure(errorMsg));
  }
}

/*--  --*/

/*--  --*/

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
}
