import * as React from 'react';
import { render } from '@testing-library/react';

import { DropdownFormComponent } from '..';

describe('<DropdownFormComponent  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<DropdownFormComponent />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
