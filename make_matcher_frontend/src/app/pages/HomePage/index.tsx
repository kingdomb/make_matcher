import { TestComponent } from 'app/components/TestComponent/Loadable';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Make Matcher Team 1" />
      </Helmet>

      <TestComponent />
    </>
  );
}
