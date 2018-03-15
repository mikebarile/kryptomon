import React from 'react';
import { Container, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import FixedMenu from 'misc/FixedMenu';
import ROUTES from 'constants/Routes';

export default function Bestiary() {
  return (
    <div>
      <FixedMenu />
      <Container text textAlign="center" style={{ marginTop: '8em' }}>
        <Header
          as="h1"
          style={{ fontSize: '3em' }}
          content="Pardon our dust!"
        />
        <Header
          as="h3"
          color="grey"
          style={{ fontWeight: 'lighter', fontSize: '2em', marginBottom: 42 }}
        >
          You found a page that is under construction! Check back soon!
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
