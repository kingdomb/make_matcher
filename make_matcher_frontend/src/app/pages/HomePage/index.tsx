/* eslint-disable @typescript-eslint/no-unused-vars */
import { FooterComponent } from 'app/components/FooterComponent/Loadable';
import { HeaderComponent } from 'app/components/HeaderComponent/Loadable';
import { TestComponent } from 'app/components/TestComponent/Loadable';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>TestPage</title>
        <meta name="description" content="Make Matcher Team 1" />
      </Helmet>

      <HeaderComponent />
      {/* <TestComponent /> */}
      <FooterComponent />
    </>
  );
}
