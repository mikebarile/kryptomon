import React from 'react';
import {
  Icon,
  Segment,
  Header,
  Container,
  Button,
  Image,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import web3 from 'src/web3';
import FixedMenu from 'misc/FixedMenu';
import ROUTES from 'constants/Routes';
import GettingStarted from 'pages/FAQ/GettingStarted';

class MetaMask extends React.Component {
  state = {
    isLocked: true,
    isInstalled: web3.currentProvider.isMetaMask === true,
  };

  componentDidMount() {
    this.refreshState();
    this.interval = setInterval(this.refreshState, 500);
  }

  refreshState = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ isLocked: accounts.length === 0 });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderLockedMessage() {
    return (
      <Container text>
        <Header
          as="h1"
          content="Your MetaMask is Locked"
          style={{ marginTop: '3em', fontSize: '3.5em' }}
        />
        <Header
          as="h2"
          color="grey"
          style={{
            fontWeight: 'lighter',
            fontSize: '1.25em',
            marginBottom: 24,
            lineHeight: '1.7em',
          }}
        >
          Just open it and enter your password to continue
        </Header>
        <Image centered src="http://via.placeholder.com/350x350" />
      </Container>
    );
  }

  renderGetMetaMask() {
    return (
      <Container text>
        <Header
          as="h1"
          content="Get MetaMask"
          style={{ marginTop: '3em', fontSize: '3.5em' }}
        />
        <Header
          as="h2"
          color="grey"
          style={{
            fontWeight: 'lighter',
            fontSize: '1.25em',
            marginBottom: 24,
            lineHeight: '1.7em',
          }}
        >
          Meet MetaMask, your passport to all things Kryptomon. MetaMask handles
          your account details and funds. It also serves as your account for the
          game, so you don&apos;t need to remember another password!
        </Header>
        <Button as="a" href="https://metamask.io/" primary size="huge">
          Get MetaMask
          <Icon style={{ margin: '0 0 0 6px' }} name="download" />
        </Button>
      </Container>
    );
  }

  renderApprovedMessage() {
    return (
      <Container text>
        <Header
          as="h1"
          content="You're All Set!"
          style={{ marginTop: '3em', fontSize: '3.5em' }}
        />
        <Header
          as="h2"
          color="grey"
          style={{
            fontWeight: 'lighter',
            fontSize: '1.25em',
            marginBottom: 24,
            lineHeight: '1.7em',
          }}
        >
          Your Kryptomon Await!
        </Header>
        <Image
          centered
          style={{ marginBottom: 24 }}
          src="http://via.placeholder.com/350x350"
        />
        <Button.Group>
          <Button as={Link} to={ROUTES.MY_KRYPTOMON} primary>
            My Kryptomon
          </Button>
          <Button.Or />
          <Button as={Link} to={ROUTES.EGG_STORE} positive>
            Buy Eggs
          </Button>
        </Button.Group>
      </Container>
    );
  }

  render() {
    const { isLocked, isInstalled } = this.state;
    return (
      <div>
        <FixedMenu />
        <Segment
          basic
          textAlign="center"
          style={{ minHeight: 700, padding: '1em 0' }}
          vertical
        >
          {isInstalled === false ? this.renderGetMetaMask() : null}
          {isInstalled && isLocked ? this.renderLockedMessage() : null}
          {isInstalled && !isLocked ? this.renderApprovedMessage() : null}
        </Segment>
        <GettingStarted />
      </div>
    );
  }
}

export default MetaMask;
