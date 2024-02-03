/**
 *
 * Asynchronously loads the component for SignupComponent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const SignupComponent = lazyLoad(
  () => import('./index'),
  module => module.SignupComponent,
);
