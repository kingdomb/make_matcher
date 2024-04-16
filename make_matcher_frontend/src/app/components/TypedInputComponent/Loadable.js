/**
 *
 * Asynchronously loads the component for TypedInputComponent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const TypedInputComponent = lazyLoad(
  () => import('./index'),
  module => module.TypedInputComponent,
);
