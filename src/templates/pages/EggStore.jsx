import React from 'react';
import numeral from 'numeral';
import {
  Segment,
  Image,
  Button,
  Grid,
  Header,
  Message,
  Container,
  Divider,
  Card,
  Popup,
  Loader,
  Dimmer,
} from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { reject, sampleSize } from 'lodash';

import faker from 'faker';

import web3 from 'src/web3';
import KryptomonKore from 'src/KryptomonKore';
import ROUTES from 'constants/Routes';
import { Species } from 'constants/Kryptomon';
import { getImageFromSpeciesId } from 'src/util';
import MetaMaskChecker from 'misc/MetaMaskChecker';

import EggImg from 'images/logo2.png';
import FixedMenu from 'misc/FixedMenu';

// Unpack KryptomonKore methods

const {
  genZeroEggPrice,
  unassignedGenZeroEggs,
  buyGenZeroEggs,
} = KryptomonKore.methods;

class EggStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genZeroEggSupply: '',
      eggPrice: '',
      loading: true,
      error: false,
      errorMessage: '',
      trxn: '',
      inTransaction: false,
      receipt: undefined,
      quantity: 1,
      network: 'private', // default to main?
      possibleContents: this.getPossibleContents(),
    };
    this.buyGenZeroEggs = this.buyGenZeroEggs.bind(this);
  }

  async componentDidMount() {
    this.checker = MetaMaskChecker(this.props.history);
    const network = await web3.eth.net.getNetworkType();
    const eggPrice = await genZeroEggPrice().call();
    const genZeroEggSupply = await unassignedGenZeroEggs().call();

    this.setState({ eggPrice, genZeroEggSupply, loading: false, network });
  }

  getPossibleContents() {
    const possibleIds = reject(Species, 'isExtinct');
    const possibleContents = sampleSize(possibleIds, 6).map((sp) => {
      sp.src = getImageFromSpeciesId(sp.id);
      return sp;
    });
    return possibleContents;
  }

  async buyGenZeroEggs() {
    const { quantity, eggPrice } = this.state;
    this.setState({
      loading: true,
      error: false,
      receipt: undefined,
      trxn: '',
      inTransaction: true,
    });
    const accounts = await web3.eth.getAccounts();
    if (accounts[0]) {
      buyGenZeroEggs(quantity)
        .send({
          from: accounts[0],
          value: Number(eggPrice) * quantity,
        })
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
            receipt: undefined,
            inTransaction: false,
            errorMessage: err.message,
          });
        });
    } else {
      this.props.history.push(ROUTES.METAMASK);
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.checker);
  }

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
              disabled={this.state.quantity >= 20}
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

  renderMessages() {
    const { error, trxn, network, receipt } = this.state;
    if (error) {
      return (
        <Grid.Row>
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
        <Grid.Row>
          <Message success compact style={{ margin: '0 21px' }}>
            <Message.Header>Yay!</Message.Header>
            <p>
              Your eggs were delivered! You can view your transaction
              confirmation with{' '}
              <a href={etherscanUrl} target="_blank">
                this{' '}
              </a>
              Etherscan.io link.
              <br />
              <br />
              Visit
              <Link to={ROUTES.MY_KRYPTOMON}> My Kryptomon</Link> to hatch your
              new eggs!
            </p>
          </Message>
        </Grid.Row>
      );
    }
    return null;
  }

  renderEggStatsBox() {
    const displayPrice = web3.utils.fromWei(
      this.state.eggPrice.toString(),
      'ether'
    );
    const displaySupply = numeral(this.state.genZeroEggSupply).format('0,0');

    return (
      <div>
        <Header
          textAlign="center"
          attached="top"
          as="h1"
          content="Gen Zero Eggs"
        />
        <Dimmer.Dimmable
          as={Segment}
          dimmed={this.state.loading}
          attached
          compact
          size="small"
        >
          {this.renderDimmer()}
          <Grid columns="2" verticalAlign="middle" style={{ width: 410 }}>
            {this.renderStatRow('Current Egg Price', `${displayPrice} ETH`)}
            {this.renderStatRow(
              'Egg Supply Remaining',
              `${displaySupply} Eggs`
            )}
            {this.renderQuantityRow()}
            <Grid.Row>
              <Message info compact style={{ margin: '0 21px' }}>
                <Message.Header>No More Eggs?</Message.Header>
                <p>
                  You can always obtain Kryptomon directly from other trainers
                  in our Marketplace! (coming soon)
                </p>
              </Message>
            </Grid.Row>
            {this.renderMessages()}
          </Grid>
        </Dimmer.Dimmable>
        <Button
          attached="bottom"
          loading={this.state.loading}
          onClick={this.buyGenZeroEggs}
          color="green"
        >
          Buy {this.state.quantity} Egg{this.state.quantity !== 1 ? 's' : ''}
        </Button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <FixedMenu />
        <div
          style={{
            marginTop: 84,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {this.renderEggStatsBox()}
          <Image src={EggImg} size="medium" style={{ padding: '34px' }} />
        </div>
        <Segment style={{ padding: '8em 0' }} vertical>
          <Container text>
            <Divider
              as="h1"
              className="header"
              horizontal
              style={{ margin: '2em 0', textTransform: 'uppercase' }}
            >
              What is an Egg?
            </Divider>
            <p>{faker.lorem.paragraphs()}</p>
            <Divider
              as="h1"
              className="header"
              horizontal
              style={{ margin: '2em 0', textTransform: 'uppercase' }}
            >
              How do Generations work?
            </Divider>
            <p>{faker.lorem.paragraphs()}</p>
            <Divider
              as="h1"
              className="header"
              horizontal
              style={{ margin: '2em 0', textTransform: 'uppercase' }}
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
      </div>
    );
  }
}

export default withRouter(EggStore);
