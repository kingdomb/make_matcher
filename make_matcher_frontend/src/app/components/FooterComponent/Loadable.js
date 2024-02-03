/**
 *
 * Asynchronously loads the component forFooterComponent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const FooterComponent = lazyLoad(
  () => import('./index'),
  module => module.FooterComponent,
);
