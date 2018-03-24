import React from 'react';
import { Container, Statistic, Input, Button } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import web3 from 'src/web3';
import KryptomonKore from 'src/KryptomonKore';
import FixedMenu from 'misc/FixedMenu';
import MetaMaskChecker from 'misc/MetaMaskChecker';

class TestBed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kryptoGod: '',
      userAccount: '',
      completeFreeze: true,
      ownedEggs: 0,
      ownedGenZeroEggs: 0,
      ownedKryptomon: 0,
      speciesStats: '',
    };

    this.refreshState = this.refreshState.bind(this);
  }

  componentDidMount() {
    this.refreshState();
    this.checker = MetaMaskChecker(this.props.history);
  }

  async refreshState() {
    const kryptoGod = await KryptomonKore.methods.kryptoGodAddress().call();
    const completeFreeze = await KryptomonKore.methods.completeFreeze().call();
    const accounts = await web3.eth.getAccounts();
    window.account = accounts[0];
    const ownedEggs = await KryptomonKore.methods
      .eggBalanceOf(window.account)
      .call();
    const ownedKryptomon = await KryptomonKore.methods
      .balanceOf(window.account)
      .call();
    const ownedGenZeroEggs = await KryptomonKore.methods
      .genZeroEggBalanceOf(window.account)
      .call();
    this.setState({
      kryptoGod,
      userAccount: window.account,
      completeFreeze,
      ownedEggs,
      ownedGenZeroEggs,
      ownedKryptomon,
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.checker);
  }

  render() {
    const buyGen0Egg = () => {
      // Current genZeroEggPrice = 0.01 ETH
      KryptomonKore.methods.buyGenZeroEggs(1).send({
        from: this.state.userAccount,
        value: web3.utils.toWei('0.01'),
      });
    };

    const toggleFreeze = () => {
      KryptomonKore.methods
        .setCompleteFreeze(!this.state.completeFreeze)
        .send({ from: window.account });
    };

    const deploySpecies = () => {
      const stats = this.state.speciesStats
        .split(' ')
        .map((el) => Number(el.trim()));
      if (stats.length === 11) {
        KryptomonKore.methods
          .addSpecies(...stats)
          .send({ from: window.account });
      }
    };

    const items = [
      { key: 'eggs', label: 'Eggs', value: this.state.ownedEggs },
      {
        key: 'genZeroEggs',
        label: 'Gen Zero Eggs',
        value: this.state.ownedGenZeroEggs,
      },
      {
        key: 'kryptomon',
        label: 'Kryptomon',
        value: this.state.ownedKryptomon,
      },
    ];

    return (
      <Container text style={{ marginTop: '84px' }}>
        <FixedMenu />
        <h2>Welcome to the Test Bed for Kryptomon!</h2>
        <br />
        <div>The current KryptoGod is: {this.state.kryptoGod}</div>
        <br />
        <div>You are browsing from: {this.state.userAccount}</div>
        <br />
        <h3>
          Current Complete Freeze?{' '}
          {this.state.completeFreeze ? 'True' : 'False'}
        </h3>
        <Button onClick={toggleFreeze}>Toggle Freeze</Button>
        <br />
        <div>
          Here we can try buying some eggs:
          <br />
          <Button onClick={buyGen0Egg}>Buy 1 Gen0 Egg</Button>
          <br />
        </div>
        <div>
          You currently own: <Statistic.Group items={items} />
        </div>
        <br />
        <h4>Deploy Species Here</h4>
        <div>
          Order: attack, defense, specialAttack, specialDefense, hitPoints,
          speed, maxChildren, breedingCooldown, evolveToId, timeToEvolve, rarity
        </div>
        <br />
        <div>
          <strong>Space delimited!</strong>
        </div>
        <br />
        <label>
          Species Stats:
          <Input
            onChange={(event) =>
              this.setState({ speciesStats: event.target.value })
            }
            action={{
              color: 'green',
              content: 'Deploy',
              onClick: deploySpecies,
            }}
            fluid
          />
        </label>
        <br />
        <Button onClick={deployAllSpecies} color="yellow">
          Deploy Test Species
        </Button>
        <br />
        <br />
        <br />
        <Button onClick={this.refreshState}>Refresh State</Button>
        <br />
      </Container>
    );
  }
}

export default withRouter(TestBed);
