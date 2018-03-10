import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import FixedMenu from 'misc/FixedMenu';
import ROUTES from 'constants/Routes';

export default function NotFound() {
  return (
    <div>
      <FixedMenu />
      <Container text textAlign="center" style={{ marginTop: '8em' }}>
        <Header as="h1" style={{ fontSize: '3em' }} content="Uh-Oh!" />
        <Header
          as="h3"
          color="grey"
          style={{ fontWeight: 'lighter', fontSize: '2em', marginBottom: 42 }}
        >
          We couldn&apos;t find the page you were looking for. Please try again
          later.
        </Header>
        <Button
          as={Link}
          to={ROUTES.HOME}
          color="blue"
          content="Take Me Home!"
          icon="right arrow"
          labelPosition="right"
        />
      </Container>
    </div>
  );
}
