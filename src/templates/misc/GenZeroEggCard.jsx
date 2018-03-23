import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';

import EggImg from 'images/logo2.png';

export default function GenZeroEggCard({ link, onClick, quantity }) {
  // stub in case no onClick passed in
  onClick = onClick || (() => {});
  return (
    <Card link={link} onClick={onClick}>
      <Label
        style={{ position: 'absolute', right: 0, bottom: 50, fontSize: 18 }}
        color="red"
        content={'x ' + quantity}
        horizontal
      />
      <Image
        src={EggImg}
        style={{ padding: '34px' }}
        label={{
          // NOTE: This should match the rarity info in util.js
          color: 'teal',
          content: 'Rare',
          icon: 'diamond',
          ribbon: true,
        }}
      />
      <Card.Content>
        <Card.Header>Kryptomon Egg</Card.Header>
        <Card.Meta>
          <strong>Gen 0</strong>
        </Card.Meta>
        <Card.Description>
          A rare Gen 0 egg! What could be inside?
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
