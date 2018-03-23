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
  Button,
} from 'semantic-ui-react';
import moment from 'moment';
import faker from 'faker';

import KryptomonKore from 'src/KryptomonKore';
import MetaMaskChecker from 'misc/MetaMaskChecker';
import { getImageFromSpeciesId, getEvolutionInformation } from 'src/util';
import { SpeciesNames, rarityById } from 'constants/Kryptomon';
import FixedMenu from 'misc/FixedMenu';

// Unpack KryptomonKore methods
const { getKryptomon, getSpeciesDetails } = KryptomonKore.methods;

class ViewKryptomon extends React.Component {
  state = {
    kryptomon: {
      birthTimeStamp: moment(),
      generation: '--',
      geneticValue: '',
      lastBred: '',
      numChildren: '',
      speciesId: '',
    },
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
    stats: {
      attack: '',
      defense: '',
      specialAttack: '',
      specialDefense: '',
      rarity: '',
      speed: '',
      hitPoints: '',
    },
    loading: true,
    evolutions: [],
    evolutionTime: moment('01-01-2090'),
    breedingTime: moment('01-01-2090'),
  };

  componentDidMount() {
    this.checker = MetaMaskChecker(this.props.history);
    this.getKryptomonDetails();
  }

  componentWillUnmount() {
    clearInterval(this.checker);
  }

  async getKryptomonDetails() {
    const kryptomon = await getKryptomon(
      this.props.match.params.kryptomonId,
    ).call();
    this.setState({ kryptomon });
    this.getSpeciesDetails(kryptomon.speciesId);
  }

  async getSpeciesDetails(speciesId) {
    const species = await getSpeciesDetails(speciesId).call();
    const evolutions = await getEvolutionInformation(species);
    this.setState({ species, loading: false, evolutions });
    this.computeKryptomonStats();
  }

  computeKryptomonStats() {
    // Compute Kryptomon stats and store for rendering later
    const { kryptomon, species } = this.state;
    const evolutionTime = moment.unix(
      Number(kryptomon.birthTimeStamp) + Number(species._timeToEvolve),
    );
    const breedingTime = moment.unix(
      Number(kryptomon.lastBred) + Number(species._breedingCooldown),
    );

    const stats = {
      attack: species._attack,
      defense: species._defense,
      specialAttack: species._specialAttack,
      specialDefense: species._specialDefense,
      rarity: species._rarity,
      speed: species._speed,
      hitPoints: species._hitPoints,
    };

    // Attach these stats to kryptomon, for easier recall later
    this.setState({
      stats,
      evolutionTime,
      breedingTime,
    });
  }

  isReadyToEvolve() {
    const { evolutionTime, species } = this.state;
    return (
      moment().isSameOrAfter(evolutionTime, 'second') &&
      species._evolveToId !== '0'
    );
  }

  isReadyToBreed() {
    return moment().isSameOrAfter(this.state.breedingTime, 'second');
  }

  renderKryptomon() {
    return (
      <Image
        src={getImageFromSpeciesId(this.state.kryptomon.speciesId)}
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

  renderEvolutionRow() {
    if (this.state.species._evolveToId !== '0') {
      if (this.isReadyToEvolve()) {
        return this.renderStatRow('Ready to Evolve', 'Now!');
      } else {
        return this.renderStatRow(
          'Ready to Evolve',
          this.state.evolutionTime.from(moment()),
        );
      }
    }
    return null;
  }

  renderStatsBox() {
    const { kryptomon, loading, species, stats } = this.state;
    const rarity = rarityById[species._rarity] || {};

    return (
      <div>
        <Header textAlign="center" attached="top" as="h1">
          {SpeciesNames[kryptomon.speciesId]}
          <Label color="red" horizontal style={{ marginLeft: 24 }}>
            Gen {kryptomon.generation}
          </Label>
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
            {this.renderStatRow('Power Rating', kryptomon.geneticValue)}
            {this.renderStatRow(
              'Born',
              moment.unix(kryptomon.birthTimeStamp).format('MM/DD/YY'),
            )}
            {this.renderStatRow('Attack', stats.attack)}
            {this.renderStatRow('Defense', stats.defense)}
            {this.renderStatRow('Special Attack', stats.specialAttack)}
            {this.renderStatRow('Special Defense', stats.specialDefense)}
            {this.renderStatRow('Health', stats.hitPoints)}
            {this.renderStatRow('Speed', stats.speed)}
            {this.renderEvolutionRow()}
          </Grid>
        </Segment>
        {this.isReadyToEvolve() ? (
          <Button attached="bottom" color="green" content="Evolve!" disabled />
        ) : null}
      </div>
    );
  }

  renderEvolutionFAQ() {
    if (this.state.species._evolveToId !== '0') {
      return (
        <div>
          <Divider
            as="h1"
            className="header"
            horizontal
            style={{
              marginBottom: 24,
              marginTop: 18,
              textTransform: 'uppercase',
            }}
          >
            Evolution
          </Divider>
          <Card.Group style={{ display: 'flex', justifyContent: 'center' }}>
            {this.state.evolutions.map(({ name, src }, idx) => (
              <Popup key={idx} trigger={<Card image={src} />}>
                {name}
              </Popup>
            ))}
          </Card.Group>
        </div>
      );
    }
    return null;
  }

  renderLineageFAQ() {
    return (
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
    );
  }

  renderFAQ() {
    return (
      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container>
          {this.renderLineageFAQ()}
          {this.renderEvolutionFAQ()}
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
          {this.renderKryptomon()}
          {this.renderStatsBox()}
        </div>
        {this.renderFAQ()}
      </div>
    );
  }
}

export default withRouter(ViewKryptomon);
