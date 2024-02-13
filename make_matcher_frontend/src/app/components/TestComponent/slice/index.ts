import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { testComponentSaga } from './saga';
import { TestComponentState } from './types';

export const initialState: TestComponentState = {
  loading: false,
};

const slice = createSlice({
  name: 'testComponent',
  initialState,
  reducers: {
    fetchStatus: state => {
      state.status = null;
      state.loading = true;
      state.error = null;
    },
    fetchStatusSuccess: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
      state.loading = false;
    },
    fetchStatusFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    reset: state => {
      state.status = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { actions: testComponentActions } = slice;

export const useTestComponentSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: testComponentSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useTestComponentSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
