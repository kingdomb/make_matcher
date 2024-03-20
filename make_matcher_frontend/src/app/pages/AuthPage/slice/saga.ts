import { call, put, takeLatest } from 'redux-saga/effects';
import { authActions as actions } from '.';
import { apiPostAuth } from 'api-service';
import { getErrorMessage } from 'api-service';

function* handleLogin(action) {
  try {
    const response = yield call(apiPostAuth, 'login', action.payload);
    console.log('Login response data: ', response.data);
    const { token, user } = response.data;
    yield put(
      actions.loginSuccess({
        accessToken: token,
        username: user.username,
      }),
    );
  } catch (error) {
    const getError = getErrorMessage(error);
    yield put(actions.loginFailure(getError));
  }
}

function* handleSignup(action) {
  const { username, password } = action.payload;
  try {
    const response = yield call(apiPostAuth, 'users', { username, password });
    console.log('Signup response data: ', response.data);
    const { token, user } = response.data;
    yield put(
      actions.loginSuccess({
        accessToken: token,
        username: user.username,
      }),
    );
  } catch (error) {
    const getError = getErrorMessage(error);
    yield put(actions.loginFailure(getError));
  }
}

export function* authSaga() {
  yield takeLatest(actions.loginRequest.type, handleLogin);
  yield takeLatest(actions.signupRequest.type, handleSignup);
}
