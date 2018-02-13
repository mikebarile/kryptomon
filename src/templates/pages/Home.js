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
  Grid
} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import LogoImg from '../../images/logo2.png';
import FixedMenu from '../misc/FixedMenu';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuVisible: false, address: null};
  }

  renderTopMenu() {
    return (
      <Container>
        <Menu inverted secondary size='large'>
          <Menu.Item as={Link} to='/' header>
            <Image
              size='mini'
              style={{marginRight: '0.75em', width: '22px'}}
              src={LogoImg}
            />
            <Header inverted style={{marginTop: 0}} as='h2'>Kryptomon</Header>
          </Menu.Item>
          <Container>
            <Menu.Item as={Link} to='/ranch'>My Kryptomon</Menu.Item>
            <Menu.Item as={Link} to='/beastiary'>Bestiary</Menu.Item>
            <Menu.Item as={Link} to='/faq'>How It Works</Menu.Item>
            <Menu.Item position='right'>
              <Button
                as={Link}
                to='/store'
                color='green'
                inverted
                style={{ marginLeft: '0.5em' }}
              >
                Buy Eggs
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
      </Container>
    );
  }

  render() {
    const {menuVisible} = this.state;
    const showFixedMenu = () => this.setState({menuVisible: true});
    const hideFixedMenu = () => this.setState({menuVisible: false});
    return (
      <div>
        {menuVisible ? <FixedMenu/> : null}
        <Visibility
          onBottomPassed={showFixedMenu}
          onBottomVisible={hideFixedMenu}
          once={false}
        >
          <Segment
            textAlign='center'
            style={{minHeight: 700, padding: '1em 0'}}
            inverted
            vertical
          >
            {this.renderTopMenu()}
            <Container text>
              <Header
                as='h1'
                content='This is Kryptomon'
                inverted
                style={{marginTop: '3em', fontSize: '4em'}}
              />
              <Header
                as='h3'
                inverted
                style={{fontWeight: 'lighter', fontSize: '1.75em'}}
              >
                Kryptomon is a game powered by blockchain technology that will forever change how we think about intellectual property.
              </Header>
              <Button primary size='huge'>
                Get Started
                <Icon name='right arrow' />
              </Button>
            </Container>
          </Segment>
        </Visibility>

        <Segment style={{ padding: '0em' }} vertical>
          <Grid celled='internally' columns='equal' stackable>
            <Grid.Row textAlign='center'>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  About
                </Header>
                <p>Super cool info about Kryptomon. Really awesome detail about creatures and stuff. Buy eggs now. Hatch them today! Battle... soon. Super cool info about Kryptomon. Really awesome detail about creatures and stuff. Buy eggs now. Hatch them today! Battle... soon.</p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Blockchain
                </Header>
                <p>Super cool info about blockchain. Praise be to Satoshi. HODL!!! Don't worry about Tether.. everything is normal! Buy PoWHCoin today! Link to informative paper about blockchain technology.</p>
              </Grid.Column>
              <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                  Software
                </Header>
                <p>dApps are so cool... Check out this awesome software stack we use. Hooray. We use Metamask and Web3, working on the Ethereum network to bring you the freshest, cutest, unique Kryptomon. Totally not related in any way to Pokemon.</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Coming Soon: Kryptomon AR
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Using the absolute bleeding-edge augmented reality technology. Our top scientists at Kryptomon Industries devised a way for you to bring your favorite Kryptomon with you, wherever you go! Hang with friends, battle your enemies, buy more eggs!!!
            </p>
            <Button as='a' size='large'>Read Post</Button>
            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
              White Paper
            </Divider>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Did We Tell You About Our White Paper?
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Yes. Of course we have a white paper about the current state of IP law, the mess that is licensing and IP ownership in today's society. Our glorious founder, the KryptoGod (praise be!) revolutionizes the intellectual property paradigm in this (totally existent) white paper.
            </p>
            <Button as='a' primary size='large'>Get the Paper</Button>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default Home;
