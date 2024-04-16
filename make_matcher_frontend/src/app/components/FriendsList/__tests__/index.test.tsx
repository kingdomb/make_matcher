import * as React from 'react';
import { render } from '@testing-library/react';

import { FriendsList } from '..';

describe('<FriendsList  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<FriendsList />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
