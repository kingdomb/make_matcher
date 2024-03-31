/**
 *
 * Asynchronously loads the component for ProfileFormComponent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const ProfileFormComponent = lazyLoad(
  () => import('./index'),
  module => module.ProfileFormComponent,
);
