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
import { Link } from 'react-router-dom';

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
    perPage: 15,
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
        ownedKryptomon.length +
        ownedEggs.length +
        (Number(ownedGenZeroEggs) > 0 ? 1 : 0),
      ownageLoading: false,
      gridLoading: false,
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
          My Inventory
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
    if (
      this.state.showEggs &&
      this.state.ownedGenZeroEggs > 0 &&
      this.state.startIdx === 0
    ) {
      return (
        <Grid.Column>
          <GenZeroEggCard
            link
            onClick={() => this.props.history.push(ROUTES.VIEW_GEN_ZERO_EGG)}
            quantity={this.state.ownedGenZeroEggs}
          />
        </Grid.Column>
      );
    }
    return null;
  }

  renderEggs() {
    return null;
  }

  renderKryptomon() {
    const { startIdx, perPage, ownedKryptomon, ownedGenZeroEggs } = this.state;
    let totalPerPage = perPage;
    if (startIdx === 0 && ownedGenZeroEggs > 0) {
      totalPerPage -= 1;
    }
    return ownedKryptomon
      .slice(startIdx, startIdx + totalPerPage)
      .map((kryptomonId) => (
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
    const {
      gridLoading,
      startIdx,
      perPage,
      totalLength,
      ownedKryptomon,
    } = this.state;
    return (
      <div style={{ marginTop: '2em' }}>
        <Header as="h1" attached="top">
          My Kryptomon
        </Header>
        <Segment attached loading={gridLoading} style={{ minHeight: 350 }}>
          <Grid doubling columns={3}>
            {this.renderGenZeroEggs()}
            {this.renderEggs()}
            {this.renderKryptomon()}
          </Grid>
        </Segment>
        <Segment attached="bottom" clearing>
          <Button
            floated="left"
            onClick={() =>
              this.setState({
                startIdx: startIdx - perPage,
              })
            }
            content="Previous"
            icon="left arrow"
            labelPosition="left"
            disabled={startIdx === 0}
          />
          <Button
            floated="right"
            onClick={() =>
              this.setState({
                startIdx: startIdx + perPage,
              })
            }
            content="Next"
            icon="right arrow"
            labelPosition="right"
            disabled={
              totalLength <= 9 ||
              ownedKryptomon.slice(startIdx, startIdx + perPage).length <
                perPage
            }
          />
        </Segment>
      </div>
    );
  }

  renderEmptyMessage() {
    return (
      <Segment
        loading={this.state.gridLoading}
        style={{ minHeight: 350, paddingTop: '3em' }}
      >
        <Header
          as="h1"
          textAlign="center"
          content="There's nothing here!"
          style={{ fontSize: '2.75em' }}
        />
        <Header
          as="h3"
          color="grey"
          textAlign="center"
          style={{ fontWeight: 'lighter', fontSize: '1.5em' }}
        >
          Get started by purchasing some eggs in the{' '}
          <Link to={ROUTES.EGG_STORE}>Egg Store</Link>!
        </Header>
        <Divider
          as="h1"
          horizontal
          style={{ margin: 0, textTransform: 'uppercase', fontSize: '1.5em' }}
        >
          OR
        </Divider>
        <Header
          as="h3"
          color="grey"
          textAlign="center"
          style={{ fontWeight: 'lighter', fontSize: '1.5em', marginTop: 18 }}
        >
          Learn about all the wonderful Kryptomon you can own in the
          <Link to={ROUTES.BESTIARY}> Bestiary</Link>!
        </Header>
      </Segment>
    );
  }

  render() {
    return (
      <div>
        <FixedMenu />
        <Container style={{ marginTop: 84 }}>
          {this.renderOwnageStats()}
          {this.state.totalLength > 0
            ? this.renderKrytomonGrid()
            : this.renderEmptyMessage()}
        </Container>
      </div>
    );
  }
}

export default withRouter(MyKryptomon);
