import * as React from 'react';
import { render } from '@testing-library/react';

import { UserProfileComponent } from '..';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe('<UserProfileComponent  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<UserProfileComponent />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
