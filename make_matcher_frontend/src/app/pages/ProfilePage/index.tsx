/**
 *
 * ProfilePage
 *
 */
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { HeaderComponent } from "../../components/HeaderComponent";
import { TestComponent } from "../../components/TestComponent";
import { FooterComponent } from "../../components/FooterComponent";
import { Helmet } from 'react-helmet-async';

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
      <div className="profile-placeholder">PROFILE</div>
      <FooterComponent />
    </>
  );
}
