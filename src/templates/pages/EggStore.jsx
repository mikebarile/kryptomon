import React from 'react';
import { Container, Grid, Button } from 'semantic-ui-react';

import EggStub from 'misc/EggStub';
import FixedMenu from 'misc/FixedMenu';

class EggStore extends React.Component {
  constructor(props) {
    super(props);
    const eggs = [];
    for (let i = 0; i < 15; i += 1) {
      eggs.push(this.generateDefaultEgg());
    }
    this.state = {
      activeItem: null,
      eggs,
    };
    this.handleItemReset = this.handleItemReset.bind(this);
    this.handleItemSelect = this.handleItemReset.bind(this);
  }

  generateDefaultEgg() {
    return { price: Math.random() };
  }

  handleItemSelect(activeItem) {
    this.setState({ activeItem });
  }

  handleItemReset() {
    this.setState({ activeItem: null });
  }

  renderAllEggs() {
    const handleSelect = egg => () => (this.setState({ activeItem: egg }));

    return (
      <Grid container stackable relaxed columns='equal'>
        {this.state.eggs.map((egg, idx) => (
          <div
            key={idx}
            style={{paddingTop: '14px'}}
            onClick={handleSelect(egg)}
          >
            <EggStub egg={egg}/>
          </div>
        ))}
      </Grid>
    );
  }

  renderEgg() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Button onClick={this.handleItemReset}>Back to Eggs</Button>
        <EggStub egg={this.state.activeItem}/>
        <Button color='green'>Order Egg</Button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <FixedMenu />
        <Container fluid text style={{marginTop: '8em' }}>
          {
            this.state.activeItem
              ? this.renderEgg()
              : this.renderAllEggs()
          }
        </Container>
      </div>
    );
  }
}

export default EggStore;
