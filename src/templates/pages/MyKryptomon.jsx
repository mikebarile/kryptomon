import React from 'react';
import {
  Container,
  Statistic,
  Divider,
  Segment,
  Header,
  Button,
  Grid,
} from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { times } from 'lodash';

import KryptomonKore from 'src/KryptomonKore';
import web3 from 'src/web3';
import MetaMaskChecker from 'misc/MetaMaskChecker';
import ROUTES from 'constants/Routes';

import GenZeroEggCard from 'misc/GenZeroEggCard';
import KryptomonCard from 'misc/KryptomonCard';
import FixedMenu from 'misc/FixedMenu';

// Unpack KryptomonKore methods here:
const {
  getKryptomonIdsForAddress,
  getEggIdsForAddress,
  genZeroEggBalanceOf,
} = KryptomonKore.methods;

class MyKryptomon extends React.Component {
  state = {
    ownedKryptomon: [],
    ownedEggs: [],
    ownedGenZeroEggs: 0,
    ownageLoading: true,
    gridLoading: true,
    startIdx: 0,
    totalLength: 0,
    showEggs: true,
  };

  componentDidMount() {
    this.checker = MetaMaskChecker(this.props.history);
    this.getOwnageStats();
  }

  componentWillUnmount() {
    window.clearInterval(this.checker);
  }

  getOwnageStats = async () => {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const ownedKryptomon = await getKryptomonIdsForAddress(account).call();
    const ownedEggs = await getEggIdsForAddress(account).call();
    const ownedGenZeroEggs = await genZeroEggBalanceOf(account).call();

    this.setState({
      ownedKryptomon,
      ownedEggs,
      ownedGenZeroEggs,
      totalLength:
        ownedKryptomon.length + ownedEggs.length + Number(ownedGenZeroEggs),
      ownageLoading: false,
      gridLoading: false, // TODO: Remove later
    });
  };

  renderOwnageStats() {
    return (
      <div>
        <Divider
          as="h1"
          horizontal
          style={{ margin: 0, textTransform: 'uppercase' }}
        >
          Inventory
        </Divider>
        <Segment basic loading={this.state.ownageLoading}>
          <Statistic.Group widths="three">
            <Statistic
              label="Gen Zero Eggs"
              value={this.state.ownedGenZeroEggs}
            />
            <Statistic label="Eggs" value={this.state.ownedEggs.length} />
            <Statistic
              label="Kryptomon"
              value={this.state.ownedKryptomon.length}
            />
          </Statistic.Group>
        </Segment>
      </div>
    );
  }

  renderGenZeroEggs() {
    if (this.state.showEggs) {
      return times(this.state.ownedGenZeroEggs, (idx) => (
        <Grid.Column key={idx}>
          <GenZeroEggCard
            link
            onClick={() => this.props.history.push(ROUTES.VIEW_GEN_ZERO_EGG)}
          />
        </Grid.Column>
      ));
    }
  }

  renderEggs() {
    return '';
  }

  renderKryptomon() {
    return this.state.ownedKryptomon.map((kryptomonId) => (
      <Grid.Column key={kryptomonId}>
        <KryptomonCard
          link
          onClick={() =>
            this.props.history.push(ROUTES.VIEW_KRYPTOMON + `/${kryptomonId}`)
          }
          kryptomonId={kryptomonId}
        />
      </Grid.Column>
    ));
  }

  renderKrytomonGrid() {
    // const toggleText = this.state.showEggs ? 'Show Eggs' : 'Hide Eggs';
    // const handleToggle = (event) => {
    //   this.setState({ showEggs: !this.state.showEggs });
    //   console.log(event.data);
    // };
    return (
      <div style={{ marginTop: '2em' }}>
        <Header as="h1" attached="top">
          My Kryptomon
        </Header>
        <Segment attached loading={this.state.gridLoading}>
          <Grid doubling columns={3}>
            {this.renderGenZeroEggs()}
            {this.renderEggs()}
            {this.renderKryptomon()}
          </Grid>
        </Segment>
        <Segment attached="bottom" clearing>
          <Button
            floated="left"
            content="Previous"
            icon="left arrow"
            labelPosition="left"
            disabled={this.state.startIdx === 0}
          />
          <Button
            floated="right"
            content="Next"
            icon="right arrow"
            labelPosition="right"
            disabled={this.state.totalLength <= 9}
          />
        </Segment>
      </div>
    );
  }

  render() {
    return (
      <div>
        <FixedMenu />
        <Container style={{ marginTop: 84 }}>
          {this.renderOwnageStats()}
          {this.renderKrytomonGrid()}
        </Container>
      </div>
    );
  }
}

export default withRouter(MyKryptomon);
