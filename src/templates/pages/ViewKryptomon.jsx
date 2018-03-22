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
import { getImageFromSpeciesId, rarityById } from 'src/util';
import FixedMenu from 'misc/FixedMenu';

// Unpack KryptomonKore methods
const { getKryptomon, getSpeciesDetails } = KryptomonKore.methods;

class ViewKryptomon extends React.Component {
  state = {
    kryptomon: {
      birthTimeStamp: '',
      generation: '--',
      geneticValue: '',
      lastBred: '',
      numChildren: '',
      speciesId: '',
      attack: '',
      defense: '',
      specialAttack: '',
      specialDefense: '',
      rarity: '',
      speed: '',
      hitPoints: '',
      isExtinct: 'false',
      timeUntilEvolution: moment(),
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
    loading: true,
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
    this.setState({ species, loading: false });
    this.computeKryptomonStats();
  }

  async getEvolveToKryptomon() {}

  computeKryptomonStats() {
    // Compute Kryptomon stats and store for rendering later
    const { kryptomon, species } = this.state;
    const timeUntilEvolution = moment.unix(
      Number(kryptomon.birthTimeStamp) + Number(species._timeToEvolve),
    );
    window.timeUntilEvolution = timeUntilEvolution;
    window.moment = moment;
    const stats = {
      attack: species._attack,
      defense: species._defense,
      specialAttack: species._specialAttack,
      specialDefense: species._specialDefense,
      rarity: species._rarity,
      speed: species._speed,
      hitPoints: species._hitPoints,
      isExtinct: species._isExtinct,
      timeUntilEvolution,

      // TODO: Remove this when speciesName's get added
      speciesName: 'Species Name',
    };

    // Attach these stats to kryptomon, for easier recall later
    this.setState({ kryptomon: Object.assign({}, kryptomon, stats) });
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

  renderStatsBox() {
    const { kryptomon, loading, species } = this.state;
    const rarity = rarityById[kryptomon.rarity] || {};

    const renderStatRow = (label, value) => {
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
    };

    const getEvolutionText = () => {
      if (moment().isSameOrAfter(kryptomon.timeUntilEvolution, 'second')) {
        return 'Now!';
      } else {
        return kryptomon.timeUntilEvolution.from(moment());
      }
    };

    return (
      <div>
        <Header textAlign="center" attached="top" as="h1">
          {kryptomon.speciesName}
          <Label color="red" horizontal style={{ marginLeft: 24 }}>
            Gen {kryptomon.generation}
          </Label>
          <Label
            color={rarity.color}
            content={rarity.name}
            icon={rarity.icon}
            horizontal
          />
          {this.state.kryptomon.isExtinct === 'true' ? (
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
            {renderStatRow('Power Rating', kryptomon.geneticValue)}
            {renderStatRow(
              'Born',
              moment.unix(kryptomon.birthTimeStamp).format('MM/DD/YY'),
            )}
            {renderStatRow('Attack', kryptomon.attack)}
            {renderStatRow('Defense', kryptomon.defense)}
            {renderStatRow('Special Attack', kryptomon.specialAttack)}
            {renderStatRow('Special Defense', kryptomon.specialDefense)}
            {renderStatRow('Health', kryptomon.hitPoints)}
            {renderStatRow('Speed', kryptomon.speed)}
            {species._evolveToId !== '0'
              ? renderStatRow('Ready to Evolve', getEvolutionText())
              : ''}
          </Grid>
        </Segment>
        {moment().isSameOrAfter(kryptomon.timeUntilEvolution, 'second') ? (
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
          <Card.Group>
            <Popup
              trigger={
                <Card
                  image={getImageFromSpeciesId(this.state.species._evolveToId)}
                />
              }
            >
              Kryptomon Species
            </Popup>
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
