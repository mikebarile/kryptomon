import React from 'react';
import { Card, Image } from 'semantic-ui-react';

import EggImg from 'images/logo2.png';

export default function EggCard({ link, onClick }) {
  // stub in case no onClick passed in
  onClick = onClick || (() => {});
  return (
    <Card link={link} onClick={onClick}>
      <Image
        src={EggImg}
        style={{ padding: '34px' }}
        label={{
          color: 'blue',
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
