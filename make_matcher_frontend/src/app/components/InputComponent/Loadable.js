/**
 *
 * Asynchronously loads the component for InputComponent
 *
 */

import { lazyLoad } from 'utils/loadable';

export const InputComponent = lazyLoad(
  () => import('./index'),
  module => module.InputComponent,
);
