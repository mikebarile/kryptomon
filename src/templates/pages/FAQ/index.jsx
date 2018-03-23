import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import FixedMenu from 'misc/FixedMenu';
import GettingStarted from './GettingStarted';
import EggInfo from './EggInfo';
import KryptomonInfo from './KryptomonInfo';
import BreedingInfo from './BreedingInfo';
import EvolutionInfo from './EvolutionInfo';

export default function FAQ() {
  return (
    <div>
      <FixedMenu />
      <Container text textAlign="center" style={{ marginTop: '8em' }}>
        <Header as="h1" style={{ fontSize: '3em' }} content="Kryptodex" />
        <Header
          as="h3"
          color="grey"
          style={{ fontWeight: 'lighter', fontSize: '2em', marginBottom: 42 }}
        >
          Your place for all things Kryptomon!
        </Header>
      </Container>
      <GettingStarted />
      <KryptomonInfo />
      <EggInfo />
      <EvolutionInfo />
      <BreedingInfo />
    </div>
  );
}
