import { delay, put, takeLatest } from 'redux-saga/effects';
import { authActions as actions } from '.';
// import { apiPost } from 'api-service';
import axios from 'axios';
import { getErrorMessage } from 'api-service';

function* handleLogin(action) {
  try {
    // placeholder
    const { username, password } = action.payload;
    // const response = yield call(apiPost, 'auth/login', { username, password });
    // simulated api response:
    yield delay(3000);
    const response = {
      data: {
        accessToken: '123',
        refreshToken: 'abc',
        expiresIn: 3600,
        user: {
          id: '123',
          username: username,
          email: 'username@example.com',
        },
      },
    };
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
}
