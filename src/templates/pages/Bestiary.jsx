import React from 'react';
import {
  Container,
  Segment,
  Header,
  Grid,
  Pagination,
} from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { range } from 'lodash';

import BestiaryCard from 'misc/BestiaryCard';
import FixedMenu from 'misc/FixedMenu';

class Bestiary extends React.Component {
  state = {
    allSpecies: range(150),
    gridLoading: false,
    perPage: 15,
    activePage: 1,
    totalLength: 150,
    totalPages: 10, // totalLength / perPage,
  };

  handlePagination = (e, { activePage }) => {
    this.setState({ activePage });
  };

  renderKryptomon() {
    const { activePage, perPage, allSpecies } = this.state;
    const startIdx = (activePage - 1) * perPage;
    return allSpecies.slice(startIdx, startIdx + perPage).map((speciesId) => (
      <Grid.Column key={speciesId}>
        <BestiaryCard speciesId={speciesId} />
      </Grid.Column>
    ));
  }

  render() {
    const { gridLoading, activePage, totalPages } = this.state;
    return (
      <div style={{ marginBottom: 100 }}>
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
          <Segment attached="bottom" basic textAlign="center">
            <Pagination
              activePage={activePage}
              onPageChange={this.handlePagination}
              totalPages={totalPages}
            />
          </Segment>
        </Container>
      </div>
    );
  }
}

export default withRouter(Bestiary);
