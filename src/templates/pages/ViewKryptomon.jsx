import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Image,
  Segment,
  Container,
  Divider,
  Card,
  Popup,
  Grid,
  Header,
} from 'semantic-ui-react';
import { times } from 'lodash';

import faker from 'faker';

// import KryptomonKore from 'src/KryptomonKore';
// import web3 from 'src/web3';

import KryptomonImg from 'images/kryptomon.png';

import FixedMenu from 'misc/FixedMenu';
import MetaMaskChecker from 'misc/MetaMaskChecker';

class ViewKryptomon extends React.Component {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.checker = MetaMaskChecker(this.props.history);
  }

  componentWillUnmount() {
    clearInterval(this.checker);
  }

  renderStatsBox() {
    return (
      <div>
        <Header
          textAlign="center"
          attached="top"
          as="h1"
          content="Kryptomon Name"
        />
        <Segment attached compact loading={this.state.loading} size="small">
          <Grid columns="2" verticalAlign="middle" style={{ width: 410 }}>
            <Grid.Row>
              <Grid.Column textAlign="right">
                <Header as="h3" style={{ fontWeight: 'lighter' }}>
                  STUFF
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as="h1" color="green" style={{ fontWeight: 'lighter' }}>
                  STUFF
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }

  renderFAQ() {
    return (
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container>
          <div>
            <Divider
              as="h1"
              className="header"
              horizontal
              style={{ margin: 24, textTransform: 'uppercase' }}
            >
              Lineage
            </Divider>
            <p>{faker.lorem.paragraphs()}</p>
          </div>
          <Divider
            as="h1"
            className="header"
            horizontal
            style={{ marginBottom: 24, textTransform: 'uppercase' }}
          >
            Evolution
          </Divider>
          <Card.Group itemsPerRow={3}>
            {times(3, (idx) => (
              <Popup key={idx} trigger={<Card image={KryptomonImg} />}>
                Kryptomon Species
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
          <Image
            src={KryptomonImg}
            size="medium"
            style={{ marginRight: '8em' }}
          />
          {this.renderStatsBox()}
        </div>
        {this.renderFAQ()}
      </div>
    );
  }
}

export default withRouter(ViewKryptomon);
