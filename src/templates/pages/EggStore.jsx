import React from 'react';
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
    return (
      <div>
        <FixedMenu />
        <Container fluid text style={{marginTop: '84px' }}>
          <Segment clearing loading={this.state.loading}>
            <div>
              <div>
                Current Egg Price: {displayPrice} ETH
              </div>
              <Button
                onClick={this.buyGenZeroEgg}
                color='green'
              >
                Buy One Egg
              </Button>
            </div>
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
