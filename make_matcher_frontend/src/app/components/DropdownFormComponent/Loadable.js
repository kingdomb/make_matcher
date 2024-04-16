/**
 *
 * Asynchronously loads the component for DropdownFormComponent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const DropdownFormComponent = lazyLoad(
  () => import('./index'),
  module => module.DropdownFormComponent,
);
