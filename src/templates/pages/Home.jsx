import React from 'react';
import {
  Menu,
  Container,
  Button,
  Header,
  Image,
  Visibility,
  Segment,
  Icon,
  Divider,
  Grid,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import ROUTES from 'constants/Routes';
import LogoImg from 'images/logo2.png';
import FixedMenu from 'misc/FixedMenu';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { menuVisible: false, address: null };
  }

  renderTopMenu() {
    return (
      <Container>
        <Menu
          inverted
          borderless
          secondary
          size="large"
          style={{ paddingTop: '2px' }}
        >
          <Menu.Item as={Link} to={ROUTES.HOME} header>
            <Image
              size="mini"
              style={{ marginRight: '0.75em', width: '22px' }}
              src={LogoImg}
            />
            <Header inverted style={{ marginTop: 0 }} as="h2">
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
              <Button as={Link} to={ROUTES.EGG_STORE} color="green" inverted>
                Buy Eggs
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }

  render() {
    const { menuVisible } = this.state;
    const showFixedMenu = () => this.setState({ menuVisible: true });
    const hideFixedMenu = () => this.setState({ menuVisible: false });
    return (
      <div>
        {menuVisible ? <FixedMenu /> : null}
        <Visibility
          onBottomPassed={showFixedMenu}
          onBottomVisible={hideFixedMenu}
          once={false}
        >
          <Segment
            textAlign="center"
            style={{
              minHeight: 700,
              padding: '0',
              background: 'black',
              backgroundImage:
                // eslint-disable-next-line
                'url(https://res.cloudinary.com/adoundakov/image/upload/b_rgb:000000,e_blur:50,o_50/v1521916244/banner_glooqj.png)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
            }}
            inverted
            vertical
          >
            {this.renderTopMenu()}
            <Container text>
              <Header
                as="h1"
                content="This is Kryptomon"
                inverted
                style={{ marginTop: '3em', fontSize: '4em' }}
              />
              <Header
                as="h3"
                inverted
                style={{ fontWeight: 'lighter', fontSize: '1.75em' }}
              >
                Kryptomon is a game powered by blockchain technology that will
                forever change how we think about intellectual property.
              </Header>
              <Button as={Link} to={ROUTES.EGG_STORE} primary size="huge">
                Get Started
                <Icon name="right arrow" />
              </Button>
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled="internally" columns="equal" stackable>
            <Grid.Row textAlign="center">
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  About
                </Header>
                <p>
                  Kryptomon are magical creatures that live on the Ethereum
                  blockchain. Other neat info coming soon. Buy eggs now. Hatch
                  them today! See all of the adorable Kryptomon you can own in
                  the <Link to={ROUTES.BESTIARY}>Bestiary</Link>.
                </p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Blockchain
                </Header>
                <p>
                  Ethereum is a decentralized platform that runs smart
                  contracts: applications that run exactly as programmed without
                  any possibility of downtime, censorship, fraud or third-party
                  interference.
                </p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Software
                </Header>
                <p>
                  Kryptomon is a dApp, which is short for decentralized
                  application. What this means is that its backend code running
                  on a decentralized peer-to-peer network, instead of on a
                  server like other popular apps you use every day. We use
                  Metamask and Web3, working on the Ethereum network to bring
                  you the freshest, cutest, unique Kryptomon.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Coming Soon: Kryptomon AR
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Using the absolute bleeding-edge augmented reality technology. Our
              top scientists at Kryptomon Industries devised a way for you to
              bring your favorite Kryptomon with you, wherever you go! Hang with
              friends, battle your enemies, buy more eggs!!!
            </p>
            <Button as="a" size="large">
              Read Post
            </Button>
            <Divider
              as="h4"
              className="header"
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
              White Paper
            </Divider>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Did We Tell You About Our White Paper?
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes. Of course we have a white paper about the current state of IP
              law, the mess that is licensing and IP ownership in today&apos;s
              society. Our glorious founder, the KryptoGod (praise be!)
              revolutionizes the intellectual property paradigm in this (totally
              existent) white paper.
            </p>
            <Button as="a" primary size="large">
              Get the Paper
            </Button>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Home;
