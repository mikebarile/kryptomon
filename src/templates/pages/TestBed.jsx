import React from 'react';

import KryptomonKore from '../../KryptomonKore';

class TestBed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      kryptoGod: '',
    };
  }

  async componentDidMount() {
    const kryptoGod = await KryptomonKore.methods.kryptoGodAddress().call();
    this.setState({ kryptoGod });
  }

  render() {
    return (
      <div>]
        <h2>Welcome to the Test Bed for Kryptomon!</h2>
        <br />
        <div>The current KryptoGod is: {this.state.kryptoGod}</div>
      </div>
    );
  }
}

export default TestBed;
