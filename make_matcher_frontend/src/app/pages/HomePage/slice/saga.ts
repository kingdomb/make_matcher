import { call, put, takeLatest } from 'redux-saga/effects';
import { homePageActions as actions } from '.';
import { apiGetProfile, apiPostProfile } from 'api-service';
import { getErrorMessage } from 'api-service';

// function* doSomething() {}
function* fetchProfile(action) {
  try {
    const token = action.payload.token;
    console.log('*** checking token:', token);
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

export function* homePageSaga() {
  // yield takeLatest(actions.someAction.type, doSomething);
  yield takeLatest(actions.fetchProfileRequest.type, fetchProfile);
  yield takeLatest(actions.updateProfileRequest.type, updateProfile);
}
