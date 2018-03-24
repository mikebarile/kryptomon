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
  Label,
} from 'semantic-ui-react';

import faker from 'faker';

import KryptomonKore from 'src/KryptomonKore';
import { getImageFromSpeciesId, getEvolutionInformation } from 'src/util';
import { Species, rarityById, typeByName } from 'constants/Kryptomon';
import FixedMenu from 'misc/FixedMenu';

// Unpack KryptomonKore methods
const { getSpeciesDetails } = KryptomonKore.methods;

class ViewKryptomon extends React.Component {
  state = {
    species: {
      isExtinct: false,
      _attack: '',
      _breedingCooldown: '',
      _defense: '',
      _evolveToId: '',
      _hitPoints: '',
      _maxChildren: '',
      _rarity: '',
      _specialAttack: '',
      _specialDefense: '',
      _speed: '',
      _timeToEvolve: '',
    },
    loading: true,
    evolutions: [],
    speciesName: '',
    speciesTypes: [],
  };

  async componentDidMount() {
    const speciesId = this.props.match.params.speciesId;
    const species = await getSpeciesDetails(speciesId).call();
    const evolutions = await getEvolutionInformation(species);
    this.setState({
      loading: false,
      species,
      evolutions,
      speciesName: Species[speciesId].name,
      speciesTypes: Species[speciesId].types,
    });
  }

  renderSpecies() {
    return (
      <Image
        src={getImageFromSpeciesId(this.props.match.params.speciesId)}
        size="medium"
        style={{ marginRight: '8em' }}
      />
    );
  }

  renderStatRow(label, value) {
    return (
      <Grid.Row style={{ padding: 0 }}>
        <Grid.Column textAlign="right">
          <Header as="h3" style={{ fontWeight: 'lighter' }}>
            {label}
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Header as="h1" color="green" style={{ fontWeight: 'lighter' }}>
            {value}
          </Header>
        </Grid.Column>
      </Grid.Row>
    );
  }

  renderTypes() {
    const types = (
      <div>
        {this.state.speciesTypes.map((type, idx) => (
          <Label
            key={idx}
            basic
            color={typeByName[type].color}
            content={type}
            horizontal
          />
        ))}
      </div>
    );

    return this.renderStatRow('Types', types);
  }

  renderStatsBox() {
    const { loading, species } = this.state;
    const rarity = rarityById[species._rarity] || {};

    return (
      <div>
        <Header textAlign="center" attached="top" as="h1">
          {this.state.speciesName}
          <Label
            color={rarity.color}
            content={rarity.name}
            icon={rarity.icon}
            horizontal
          />
          {species.isExtinct === true ? (
            <Label
              color="black"
              content="Extinct"
              icon="exclamation triangle"
              horizontal
            />
          ) : null}
        </Header>
        <Segment attached compact loading={loading} size="small">
          <Grid
            columns="2"
            verticalAlign="middle"
            style={{ width: 410, padding: '14px 0' }}
          >
            {this.renderStatRow('Attack', species._attack)}
            {this.renderStatRow('Defense', species._defense)}
            {this.renderStatRow('Special Attack', species._specialAttack)}
            {this.renderStatRow('Special Defense', species._specialDefense)}
            {this.renderStatRow('Health', species._hitPoints)}
            {this.renderStatRow('Speed', species._speed)}
            {/* {this.renderStatRow('Time to Evolve', '10000')}
            {this.renderStatRow('Breeding Cooldown', '10000')} */}
            {this.renderTypes()}
          </Grid>
        </Segment>
      </div>
    );
  }

  renderEvolutionFAQ() {
    if (this.state.species._evolveToId !== '0') {
      return (
        <Container>
          <Divider
            as="h1"
            className="header"
            horizontal
            style={{
              marginBottom: 24,
              marginTop: 18,
              textTransform: 'uppercase',
            }}
            content="Evolution"
          />
          <Card.Group style={{ display: 'flex', justifyContent: 'center' }}>
            {this.state.evolutions.map(({ name, src }, idx) => (
              <Popup key={idx} trigger={<Card image={src} />}>
                {name}
              </Popup>
            ))}
          </Card.Group>
        </Container>
      );
    }
    return null;
  }

  renderBio() {
    return (
      <Container>
        <Divider
          as="h1"
          className="header"
          horizontal
          style={{
            marginBottom: 24,
            marginTop: 18,
            textTransform: 'uppercase',
          }}
          content="Bio"
        />
        <p>{faker.lorem.paragraphs()}</p>
      </Container>
    );
  }

  renderFAQ() {
    return (
      <Segment style={{ padding: '8em 0em' }} vertical>
        {this.renderBio()}
        {this.renderEvolutionFAQ()}
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
          {this.renderSpecies()}
          {this.renderStatsBox()}
        </div>
        {this.renderFAQ()}
      </div>
    );
  }
}

export default withRouter(ViewKryptomon);
