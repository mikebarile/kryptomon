import React from 'react';
import { Card, Image } from 'semantic-ui-react';

import KryptomonImg from 'images/kryptomon.png';

export default function KryptomonCard({ link, onClick }) {
  // stub in case no onClick passed in
  onClick = onClick || (() => {});
  return (
    <Card link={link} onClick={onClick}>
      <Image src={KryptomonImg} style={{ padding: '34px' }} />
      <Card.Content>
        <Card.Header>Kryptomon</Card.Header>
        <Card.Meta>
          <strong>Gen 0</strong>
        </Card.Meta>
        <Card.Description>
          Some basic stats about this Kryptomon! <br />
          Maybe attack, defense, how old it is?
        </Card.Description>
      </Card.Content>
    </Card>
  );
}
