import * as React from 'react';
import { render } from '@testing-library/react';

import { ProfilePage } from '..';

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

describe('<ProfilePage  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ProfilePage />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
