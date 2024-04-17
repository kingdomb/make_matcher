import * as React from 'react';
import { render } from '@testing-library/react';

import { UserMatches } from '..';

describe('<UserMatches  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<UserMatches />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
