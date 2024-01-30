// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { TestComponentState } from 'app/components/TestComponent/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  testComponent?: TestComponentState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}
