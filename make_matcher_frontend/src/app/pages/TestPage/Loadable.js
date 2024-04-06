/**
 *
 * Asynchronously loads the component for TestPage
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TestPage = lazyLoad(
  () => import('./index'),
  module => module.TestPage,
);
