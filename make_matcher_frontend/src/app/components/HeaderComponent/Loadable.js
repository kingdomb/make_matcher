/**
 *
 * Asynchronously loads the component forHeaderComponent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const HeaderComponent = lazyLoad(
  () => import('./index'),
  module => module.HeaderComponent,
);
