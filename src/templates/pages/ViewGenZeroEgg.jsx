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
} from 'semantic-ui-react';
import { times, random } from 'lodash';

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
    loading: false,
    error: false,
    ownedGenZeroEggs: 0,
    trxn: '',
    quantity: 1,
    possibleContents: this.getPossibleContents(),
  };

  async componentDidMount() {
    this.checker = MetaMaskChecker(this.props.history);
    const accounts = await web3.eth.getAccounts();
    const ownedGenZeroEggs = await genZeroEggBalanceOf(accounts[0]).call();
    this.setState({ ownedGenZeroEggs });
  }

  componentWillUnmount() {
    clearInterval(this.checker);
  }

  getPossibleContents() {
    const possibleContents = [];
    times(6, () => {
      const speciesId = random(1, Species.length);
      possibleContents.push({
        speciesId,
        name: Species[speciesId].name,
        src: getImageFromSpeciesId(speciesId),
      });
    });
    return possibleContents;
  }

  hatchEgg = async () => {
    this.setState({ loading: true, error: false });
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    hatchGenZeroEgg(this.state.quantity)
      .send({ from: account })
      .then(({ transactionHash }) => {
        this.setState({
          loading: false,
          error: false,
          trxn: transactionHash,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: true,
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
    const { error, trxn } = this.state;
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
    if (!error && trxn.length > 0) {
      return (
        <Grid.Row centered textAlign="left">
          <Message success compact style={{ margin: '0 21px' }}>
            <Message.Header>
              Your Kryptomon {this.state.quantity === 1 ? 'is' : 'are'}{' '}
              hatching!
            </Message.Header>
            <p>
              Track {this.state.quantity === 1 ? 'its' : 'their'} progress{' '}
              <a href={`https://etherscan.io/tx/${trxn}`}>here</a>.
              <br />
              <br />
              Once hatched, visit
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
        <Header
          textAlign="center"
          attached="top"
          as="h1"
          content="Kryptomon Egg"
        />
        <Segment attached compact loading={this.state.loading} size="small">
          <Grid columns="2" verticalAlign="middle" style={{ width: 410 }}>
            {this.renderQuantityRow()}
            {this.renderMessages()}
          </Grid>
        </Segment>
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

// Regular Egg FAQ Section
{
  /* <div>
              <Divider
                as="h1"
                className="header"
                horizontal
                style={{ margin: 24, textTransform: 'uppercase' }}
              >
                Lineage
              </Divider>
              <p>{faker.lorem.paragraphs()}</p>
            </div> */
}
