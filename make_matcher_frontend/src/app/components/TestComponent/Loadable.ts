/**
 *
 * Asynchronously loads the component for TestComponent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TestComponent = lazyLoad(
  () => import('./index'),
  module => module.TestComponent,
);
