/**
 *
 * TestPage
 *
 */
import { FooterComponent } from 'app/components/FooterComponent';
import { HeaderComponent } from 'app/components/HeaderComponent';
import { TestComponent } from 'app/components/TestComponent';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function TestPage(props) {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Make Matcher Team 1" />
      </Helmet>

      <HeaderComponent />
      <TestComponent />
      <FooterComponent />
    </>
  );
}
