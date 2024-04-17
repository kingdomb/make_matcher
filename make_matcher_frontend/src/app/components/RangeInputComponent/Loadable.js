/**
 *
 * Asynchronously loads the component for RangeInputComponent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const RangeInputComponent = lazyLoad(
  () => import('./index'),
  module => module.RangeInputComponent,
);
