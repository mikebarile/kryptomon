import React from 'react';
import numeral from 'numeral';
import {
  Container,
  Segment,
  Image,
  Button,
} from 'semantic-ui-react';

import web3 from 'src/web3';
import KryptomonKore from 'src/KryptomonKore';

import EggImg from 'images/logo2.png';
import FixedMenu from 'misc/FixedMenu';

class EggStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      genZeroEggSupply: '',
      genZeroEggPrice: '',
      loading: true,
    };
    this.buyGenZeroEgg = this.buyGenZeroEgg.bind(this);
  }

  async componentDidMount() {
    const genZeroEggPrice = await KryptomonKore.methods
      .genZeroEggPrice().call();
    const genZeroEggSupply = await KryptomonKore.methods
      .genZeroEggTotalSupply().call();

    this.setState({genZeroEggPrice, genZeroEggSupply, loading: false});
  }

  async buyGenZeroEgg() {
    this.setState({loading: true});
    const accounts = await web3.eth.getAccounts();
    if (accounts[0]) {
      KryptomonKore.methods.buyGenZeroEggs(1).send({
        from: accounts[0],
        value: this.state.genZeroEggPrice,
      }).then(() => {
        this.setState({loading: false});
      });
    } else {
      console.log('NO ACCOUNT FOUND...');
      this.setState({loading: false});
    }
  }

  render() {
    const displayPrice = web3.utils.fromWei(
      this.state.genZeroEggPrice.toString(),
      'ether'
    );

    const displaySupply = numeral(this.state.genZeroEggSupply).format('0,0');
    return (
      <div>
        <FixedMenu />
        <Container fluid text style={{marginTop: '84px'}}>
          <Segment
            basic
            clearing
            style={{display: 'flex', alignItems: 'center'}}
          >
            <Segment
              padded
              size='large'
              floated='left'
              clearing
              loading={this.state.loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <div>
                <span>Current Egg Price</span>
                <span>{displayPrice} ETH</span>
              </div>
              <div>
                <span>Egg Supply Remaining</span>
                <span>{displaySupply} Eggs</span>
              </div>
              <Button
                loading={this.state.loading}
                // disabled={this.state.loading}
                onClick={this.buyGenZeroEgg}
                color='green'
              >
                  Buy One Egg
              </Button>
            </Segment>
            <Image
              src={EggImg}
              size='medium'
              style={{ padding: '34px' }}
              floated='right'
            />
          </Segment>
        </Container>
      </div>
    );
  }
}

export default EggStore;
