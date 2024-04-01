/**
 *
 * Asynchronously loads the component for UserProfileComponent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const UserProfileComponent = lazyLoad(
  () => import('./index'),
  module => module.UserProfileComponent,
);
