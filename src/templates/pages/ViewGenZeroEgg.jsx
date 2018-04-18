import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  Image,
  Segment,
  Container,
  Divider,
  Card,
  Popup,
  Grid,
  Header,
  Button,
  Message,
  Label,
  Loader,
  Dimmer,
} from 'semantic-ui-react';
import { sampleSize, reject } from 'lodash';

import faker from 'faker';

import KryptomonKore from 'src/KryptomonKore';
import web3 from 'src/web3';
import ROUTES from 'constants/Routes';
import { Species } from 'constants/Kryptomon';
import { getImageFromSpeciesId } from 'src/util';
import EggImg from 'images/logo2.png';
import FixedMenu from 'misc/FixedMenu';
import MetaMaskChecker from 'misc/MetaMaskChecker';

// Unpack KryptomonKore methods

const { hatchGenZeroEgg, genZeroEggBalanceOf } = KryptomonKore.methods;

class ViewGenZeroEgg extends React.Component {
  state = {
    loading: true,
    error: false,
    ownedGenZeroEggs: 0,
    trxn: '',
    receipt: undefined,
    inTransaction: false,
    quantity: 1,
    possibleContents: this.getPossibleContents(),
    network: 'private',
  };

  async componentDidMount() {
    this.checker = MetaMaskChecker(this.props.history);
    const accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType();
    const ownedGenZeroEggs = await genZeroEggBalanceOf(accounts[0]).call();
    this.setState({ ownedGenZeroEggs, network, loading: false });
  }

  componentWillUnmount() {
    clearInterval(this.checker);
  }

  getPossibleContents() {
    const possibleIds = reject(Species, 'isExtinct');
    const possibleContents = sampleSize(possibleIds, 6).map((sp) => {
      sp.src = getImageFromSpeciesId(sp.id);
      return sp;
    });
    return possibleContents;
  }

  hatchEgg = async () => {
    this.setState({
      loading: true,
      error: false,
      receipt: undefined,
      inTransaction: true,
      trxn: '',
    });
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    hatchGenZeroEgg(this.state.quantity)
      .send({ from: account })
      .on('transactionHash', (transactionHash) => {
        this.setState({
          trxn: transactionHash,
        });
      })
      .on('receipt', (receipt) => {
        this.setState({
          loading: false,
          error: false,
          inTransaction: false,
          receipt,
        });
      })
      .on('error', (err) => {
        this.setState({
          loading: false,
          error: true,
          inTransaction: false,
          receipt: undefined,
          errorMessage: err.message,
        });
      });
  };

  renderStatRow(label, value) {
    return (
      <Grid.Row>
        <Grid.Column textAlign="right">
          <Header as="h3" style={{ fontWeight: 'lighter' }}>
            {label}
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Header as="h1" color="green" style={{ fontWeight: 'lighter' }}>
            {value}
          </Header>
        </Grid.Column>
      </Grid.Row>
    );
  }

  renderDimmer() {
    let dimmerContent = '';
    if (this.state.inTransaction) {
      if (this.state.trxn.length > 0) {
        dimmerContent = 'Confirming transaction with blockchain';
      } else {
        dimmerContent = 'Waiting for transaction id';
      }
    }

    return (
      <Dimmer active={this.state.loading}>
        <Loader
          indeterminate={
            this.state.inTransaction && this.state.trxn.length === 0
          }
        >
          {dimmerContent}
        </Loader>
      </Dimmer>
    );
  }

  renderQuantityRow() {
    return (
      <Grid.Row>
        <Grid.Column textAlign="right">
          <Header
            as="h3"
            style={{ fontWeight: 'lighter' }}
            content="Quantity"
          />
        </Grid.Column>
        <Grid.Column>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              compact
              disabled={this.state.quantity <= 1}
              icon="minus"
              size="mini"
              style={{ margin: 0 }}
              onClick={() =>
                this.setState({ quantity: this.state.quantity - 1 })
              }
            />
            <Header
              as="strong"
              color="green"
              style={{
                fontWeight: 'lighter',
                margin: '0 7px',
                fontSize: '2rem',
              }}
              content={this.state.quantity}
            />
            <Button
              compact
              disabled={
                this.state.quantity >= 5 ||
                this.state.quantity >= this.state.ownedGenZeroEggs
              }
              icon="plus"
              size="mini"
              onClick={() =>
                this.setState({ quantity: this.state.quantity + 1 })
              }
            />
          </div>
        </Grid.Column>
      </Grid.Row>
    );
  }

  renderMessages() {
    const { error, trxn, network, receipt } = this.state;
    if (error) {
      return (
        <Grid.Row centered textAlign="left">
          <Message error compact style={{ margin: '0 21px' }}>
            <Message.Header>Uh Oh</Message.Header>
            There was an error processing your transaction. Please try again
            later.
          </Message>
        </Grid.Row>
      );
    }
    if (!error && typeof receipt === 'object') {
      let etherscanUrl = `https://etherscan.io/tx/${trxn}`;
      if (network === 'rinkeby') {
        // Use rinkeby URL instead
        etherscanUrl = `https://rinkeby.etherscan.io/tx/${trxn}`;
      }
      return (
        <Grid.Row centered textAlign="left">
          <Message success compact style={{ margin: '0 21px' }}>
            <Message.Header>
              Your Kryptomon {this.state.quantity === 1 ? 'has' : 'have'}{' '}
              hatched!
            </Message.Header>
            <p>
              View your confirmation{' '}
              <a href={etherscanUrl} target="_blank">
                here
              </a>.
              <br />
              <br />
              Visit
              <Link to={ROUTES.MY_KRYPTOMON}> My Kryptomon</Link> to meet{' '}
              {this.state.quantity === 1 ? 'it' : 'them'}!
            </p>
          </Message>
        </Grid.Row>
      );
    }
    return null;
  }

  renderEggStatsBox() {
    return (
      <div>
        <Header textAlign="center" attached="top" as="h1">
          Kryptomon Egg
          <Label
            style={{ fontSize: 18, marginLeft: 14 }}
            horizontal
            color="red"
            content={`x ${this.state.ownedGenZeroEggs}`}
          />
        </Header>
        <Dimmer.Dimmable
          as={Segment}
          dimmed={this.state.loading}
          attached
          compact
          size="small"
          style={{ minHeight: 250 }}
        >
          {this.renderDimmer()}
          <Grid columns="2" verticalAlign="middle" style={{ width: 410 }}>
            {this.renderQuantityRow()}
            {this.renderMessages()}
          </Grid>
        </Dimmer.Dimmable>
        <Button
          attached="bottom"
          loading={this.state.loading}
          onClick={this.hatchEgg}
          color="green"
        >
          Hatch {this.state.quantity} Egg{this.state.quantity !== 1 ? 's' : ''}
        </Button>
      </div>
    );
  }

  renderFAQ() {
    return (
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container>
          <Divider
            as="h1"
            className="header"
            horizontal
            style={{ marginBottom: 24, textTransform: 'uppercase' }}
          >
            What is a Gen Zero Egg?
          </Divider>
          <p>{faker.lorem.paragraphs()}</p>
          <Divider
            as="h1"
            className="header"
            horizontal
            style={{ marginBottom: 24, textTransform: 'uppercase' }}
          >
            Possible Contents
          </Divider>
          <Card.Group itemsPerRow={6}>
            {this.state.possibleContents.map((el, idx) => (
              <Popup
                key={idx}
                trigger={
                  <Card>
                    <Image src={el.src} style={{ background: 'none' }} />
                  </Card>
                }
              >
                {el.name}
              </Popup>
            ))}
          </Card.Group>
        </Container>
      </Segment>
    );
  }

  render() {
    return (
      <div>
        <FixedMenu />
        <div
          style={{
            marginTop: '10em',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image src={EggImg} size="medium" style={{ marginRight: '8em' }} />
          {this.renderEggStatsBox()}
        </div>
        {this.renderFAQ()}
      </div>
    );
  }
}

export default withRouter(ViewGenZeroEgg);
