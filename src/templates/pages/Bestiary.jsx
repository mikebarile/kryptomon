import React from 'react';
import { Container, Segment, Header, Button, Grid } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { range } from 'lodash';

import BestiaryCard from 'misc/BestiaryCard';
import FixedMenu from 'misc/FixedMenu';

class Bestiary extends React.Component {
  state = {
    allSpecies: range(150),
    gridLoading: false,
    perPage: 15,
    startIdx: 0,
    totalLength: 150,
  };

  renderKryptomon() {
    const { startIdx, perPage, allSpecies } = this.state;
    return allSpecies.slice(startIdx, startIdx + perPage).map((speciesId) => (
      <Grid.Column key={speciesId}>
        <BestiaryCard speciesId={speciesId} />
      </Grid.Column>
    ));
  }

  render() {
    const {
      gridLoading,
      startIdx,
      totalLength,
      allSpecies,
      perPage,
    } = this.state;
    return (
      <div>
        <FixedMenu />
        <Container style={{ marginTop: 84 }}>
          <Header as="h1" attached="top">
            Bestiary
          </Header>
          <Segment attached loading={gridLoading} style={{ minHeight: 350 }}>
            <Grid doubling columns={3}>
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
                allSpecies.slice(startIdx, startIdx + perPage).length < perPage
              }
            />
          </Segment>
        </Container>
      </div>
    );
  }
}

export default withRouter(Bestiary);
