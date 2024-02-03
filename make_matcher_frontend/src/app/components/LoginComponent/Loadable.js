/**
 *
 * Asynchronously loads the component for LoginComponent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LoginComponent = lazyLoad(
  () => import('./index'),
  module => module.LoginComponent,
);
