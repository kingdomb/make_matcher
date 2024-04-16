/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 *
 * ProfilePage
 *
 */

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { Helmet } from 'react-helmet-async';
import { ProfileFormComponent } from 'app/components/ProfileFormComponent';
import { HeaderComponent } from 'app/components/HeaderComponent';
import { FooterComponent } from 'app/components/FooterComponent';

interface Props {}

export function ProfilePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <title>ProfilePage</title>
        <meta name="description" content="Make Matcher Team 1" />
      </Helmet>

      <HeaderComponent />
      {/* <div className="profile-placeholder">
        <TestComponent />
      </div> */}
      <div className="profile-placeholder" style={{ width: '100vw' }}>
        <ProfileFormComponent />
      </div>
      <FooterComponent />
    </>
  );
}
