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
} from 'semantic-ui-react';
import { withRouter } from 'react-router';

import faker from 'faker';

import web3 from 'src/web3';
import KryptomonKore from 'src/KryptomonKore';
import ROUTES from 'constants/Routes';
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
      quantity: 1,
    };
    this.buyGenZeroEggs = this.buyGenZeroEggs.bind(this);
  }

  async componentDidMount() {
    this.checker = MetaMaskChecker(this.props.history);

    const eggPrice = await genZeroEggPrice().call();
    const genZeroEggSupply = await unassignedGenZeroEggs().call();

    this.setState({ eggPrice, genZeroEggSupply, loading: false });
  }

  async buyGenZeroEggs() {
    const { quantity, eggPrice } = this.state;
    this.setState({ loading: true });
    const accounts = await web3.eth.getAccounts();
    if (accounts[0]) {
      buyGenZeroEggs(quantity)
        .send({
          from: accounts[0],
          value: Number(eggPrice) * quantity,
        })
        .then(() => {
          this.setState({ loading: false });
        });
    } else {
      this.props.history.push(ROUTES.METAMASK);
    }
  }

  componentWillUnmount() {
    window.clearInterval(this.checker);
  }

  renderEggStatsBox() {
    const displayPrice = web3.utils.fromWei(
      this.state.eggPrice.toString(),
      'ether',
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
        <Segment attached compact loading={this.state.loading} size="small">
          <Grid columns="2" verticalAlign="middle" style={{ width: 410 }}>
            <Grid.Row>
              <Grid.Column textAlign="right">
                <Header as="h3" style={{ fontWeight: 'lighter' }}>
                  Current Egg Price
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as="h1" color="green" style={{ fontWeight: 'lighter' }}>
                  {displayPrice} ETH
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="right">
                <Header as="h3" style={{ fontWeight: 'lighter' }}>
                  Egg Supply Remaining
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as="h1" color="green" style={{ fontWeight: 'lighter' }}>
                  {displaySupply} Eggs
                </Header>
              </Grid.Column>
            </Grid.Row>
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
            <Grid.Row>
              <Message info compact style={{ margin: '0 21px' }}>
                <Message.Header>No More Eggs?</Message.Header>
                <p>
                  You can always obtain Kryptomon directly from other users in
                  our Marketplace! (coming soon)
                </p>
              </Message>
            </Grid.Row>
          </Grid>
        </Segment>
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
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Divider
              as="h1"
              className="header"
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
              What is an Egg?
            </Divider>
            <p>{faker.lorem.paragraphs()}</p>
            <Divider
              as="h1"
              className="header"
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
              How do Generations work?
            </Divider>
            <p>{faker.lorem.paragraphs()}</p>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default withRouter(EggStore);
