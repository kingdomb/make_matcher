import { call, put, takeLatest } from 'redux-saga/effects';
import { testComponentActions as actions } from '.';
import { apiPost } from 'api-service';
import axios from 'axios';

function* fetchStatusSaga() {
  try {
    const response = yield call(apiPost, '', {});
    if (response.data.status) {
      yield put(actions.fetchStatusSuccess(response.data.status));
    } else {
      throw new Error('No status');
    }
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (axios.isAxiosError(error)) {
      errorMessage = `Error ${error.response?.status}: ${
        error.response?.data.message || error.message
      }`;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(actions.fetchStatusFailure(errorMessage));
  }
}

export function* testComponentSaga() {
  yield takeLatest(actions.fetchStatus.type, fetchStatusSaga);
}
