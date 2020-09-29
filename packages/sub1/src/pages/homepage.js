import React from 'react';
import { Helmet } from 'react-helmet';

export function HomePage() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Homepage</title>
      </Helmet>
      <h1>It is a homepage....</h1>
    </React.Fragment>
  );
}
