import React from 'react';
import { Accordion, Segment, Container, Header } from 'semantic-ui-react';
import { times } from 'lodash';
// TODO: remove after testing
import faker from 'faker';

const panels = times(3, () => ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(),
}));

// TODO: SHOW POSSIBLE CONTENTS?

export default function BreedingInfo() {
  return (
    <Segment vertical basic>
      <Container text>
        <Header attached="top" as="h3">
          What are generations?
        </Header>
        <Segment attached>
          <Accordion panels={panels} exclusive={false} />
        </Segment>
      </Container>
    </Segment>
  );
}
