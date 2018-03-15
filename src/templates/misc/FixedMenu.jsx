import React from 'react';
import { Menu, Container, Image, Button, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import LogoImg from 'images/logo2.png';
import ROUTES from 'constants/Routes';

export default function FixedMenu() {
  return (
    <Menu fixed="top" size="large" borderless>
      <Container>
        <Menu.Item as={Link} to={ROUTES.HOME} header>
          <Image
            size="mini"
            style={{ marginRight: '0.75em', width: '22px' }}
            src={LogoImg}
          />
          <Header style={{ marginTop: 0 }} as="h2">
            Kryptomon
          </Header>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item as={Link} to={ROUTES.MY_KRYPTOMON}>
            My Kryptomon
          </Menu.Item>
          <Menu.Item as={Link} to={ROUTES.BESTIARY}>
            Bestiary
          </Menu.Item>
          <Menu.Item as={Link} to={ROUTES.FAQ}>
            How It Works
          </Menu.Item>
          <Menu.Item>
            <Button as={Link} to={ROUTES.EGG_STORE} color="green">
              Buy Eggs
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
