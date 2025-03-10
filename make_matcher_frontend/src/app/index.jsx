/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import { GlobalStyle } from 'styles/global-styles';
import '../styles/main.scss';

import { AuthPage } from './pages/AuthPage/index.jsx';
import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage';
import { useTranslation } from 'react-i18next';
import { SignupPage } from './pages/SignupPage/Loadable';
import { ProfilePage } from './pages/ProfilePage';
import { TestPage } from './pages/TestPage';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Make Matcher Team 1"
        defaultTitle="Make Matcher Team 1"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Make Matcher Team 1" />
      </Helmet>

      <Routes>
        <Route index={true} path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
