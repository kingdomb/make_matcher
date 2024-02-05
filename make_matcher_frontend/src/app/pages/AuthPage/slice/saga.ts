import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { authActions as actions } from '.';
import { apiPost } from 'api-service';
import { getErrorMessage } from 'api-service';

function* handleLogin(action) {
  try {
    const response = yield call(apiPost, 'login', action.payload);
    console.log('Login response data: ', response.data);
    const { token, user } = response.data;
    yield put(
      actions.loginSuccess({
        accessToken: token,
        username: user.username,
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    yield put(actions.loginFailure(errorMessage));
  }
}

function* handleSignup(action) {
  try {
    // placeholder
    // const response = yield call(apiPost, 'auth/signup', action.payload);
    // simulated api response:
    yield delay(3000);
    const { username } = action.payload;
    const response = {
      data: {
        accessToken: '123',
        refreshToken: 'abc',
        expiresIn: 3600,
        user: {
          id: '124',
          username: username,
          email: 'username@example.com',
        },
      },
    };
    console.log('Signup response data: ', response.data);
    const { accessToken, refreshToken, user } = response.data;
    yield put(
      actions.loginSuccess({
        accessToken,
        refreshToken,
        username: user.username,
      }),
    );
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    yield put(actions.loginFailure(errorMessage));
  }
}

export function* authSaga() {
  yield takeLatest(actions.loginRequest.type, handleLogin);
  yield takeLatest(actions.signupRequest.type, handleSignup);
}
