import React from 'react';
import Nav from '../nav';
import { Container } from 'stardust';

import 'semantic-ui-css/semantic.min.css';

export default function Layout({ children }) {
  return (
    <Container>
      <Nav />
      <main id="content">{children}</main>
    </Container>
  );
}

Layout.displayName = 'Layout';
