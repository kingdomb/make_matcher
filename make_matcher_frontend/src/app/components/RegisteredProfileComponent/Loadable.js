/**
 *
 * Asynchronously loads the component for RegisteredProfileComponent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RegisteredProfileComponent = lazyLoad(
  () => import('./index'),
  module => module.RegisteredProfileComponent,
);
