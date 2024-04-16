import * as React from 'react';
import { render } from '@testing-library/react';

import { GroupsList } from '..';

describe('<GroupsList  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<GroupsList />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
