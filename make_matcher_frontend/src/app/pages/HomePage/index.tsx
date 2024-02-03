import { TestComponent } from 'app/components/TestComponent/Loadable';
import { Header } from '../../components/HeaderComponent/Header.jsx';
import { Footer } from '../../components/FooterComponent/Footer.jsx';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Make Matcher Team 1" />
      </Helmet>

      <Header />
      <TestComponent />
      <Footer />
    </>
  );
}
