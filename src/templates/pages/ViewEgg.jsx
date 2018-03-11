import React from 'react';
import { withRouter } from 'react-router-dom';
import { Image, Segment, Container, Divider } from 'semantic-ui-react';

import faker from 'faker';

// import KryptomonKore from 'src/KryptomonKore';
// import web3 from 'src/web3';

import EggImg from 'images/logo2.png';

import FixedMenu from 'misc/FixedMenu';

class ViewEgg extends React.Component {
  render() {
    const isGenZero = this.props.genZero;
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
          <Image src={EggImg} size="medium" style={{ padding: '34px' }} />
        </div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            {isGenZero ? null : (
              <div>
                <Divider
                  as="h1"
                  className="header"
                  horizontal
                  style={{ margin: '3em 0em', textTransform: 'uppercase' }}
                >
                  Lineage Information
                </Divider>
                <p>{faker.lorem.paragraphs()}</p>
              </div>
            )}
            <Divider
              as="h1"
              className="header"
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
              Possible Kryptomon
            </Divider>
            <p>{faker.lorem.paragraphs()}</p>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default withRouter(ViewEgg);
