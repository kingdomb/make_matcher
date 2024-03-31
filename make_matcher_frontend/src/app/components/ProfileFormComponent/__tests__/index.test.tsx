import * as React from 'react';
import { render } from '@testing-library/react';

import { ProfileFormComponent } from '..';

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

describe('<ProfileFormComponent  />', () => {
  it('should match snapshot', () => {
    const loadingIndicator = render(<ProfileFormComponent />);
    expect(loadingIndicator.container.firstChild).toMatchSnapshot();
  });
});
