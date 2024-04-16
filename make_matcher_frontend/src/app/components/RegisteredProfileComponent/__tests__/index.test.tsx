import * as React from 'react';
import { render } from '@testing-library/react';

import { RegisteredProfileComponent } from '..';

describe('<RegisteredProfileComponent  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<RegisteredProfileComponent />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
