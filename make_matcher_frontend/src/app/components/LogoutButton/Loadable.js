/**
 *
 * Asynchronously loads the component for LogoutButton
 *
 */

import { lazyLoad } from 'utils/loadable';

export const LogoutButton = lazyLoad(
  () => import('./index'),
  module => module.LogoutButton,
);
