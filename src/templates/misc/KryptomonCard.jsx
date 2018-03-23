import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import moment from 'moment';

import { getImageFromKryptomonId } from 'src/util';
import { rarityById, SpeciesNames } from 'constants/Kryptomon';
import KryptomonKore from 'src/KryptomonKore';

// Unpack KryptomonKore methods
const { getKryptomon, getSpeciesDetails } = KryptomonKore.methods;

class KryptomonCard extends React.Component {
  static defaultProps = {
    link: false,
    onClick: () => {},
    // don't stub kryptomonId, need to fail if missing
  };

  state = {
    imgSrc: '', // Maybe load a placeholder locally?
    kryptomon: {
      generation: '--',
    },
    species: {},
    evolutionTime: moment('01-01-2090'),
    breedingTime: moment('01-01-2090'),
  };

  async componentDidMount() {
    const imgSrc = await getImageFromKryptomonId(this.props.kryptomonId);
    const kryptomon = await getKryptomon(this.props.kryptomonId).call();
    const species = await getSpeciesDetails(kryptomon.speciesId).call();
    const evolutionTime = moment.unix(
      Number(kryptomon.birthTimeStamp) + Number(species._timeToEvolve),
    );
    const breedingTime = moment.unix(
      Number(kryptomon.lastBred) + Number(species._breedingCooldown),
    );
    this.setState({ imgSrc, kryptomon, species, evolutionTime, breedingTime });
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

  render() {
    const rarity = rarityById[this.state.species._rarity] || {};
    return (
      <Card link={this.props.link} onClick={this.props.onClick}>
        <Image
          src={this.state.imgSrc}
          style={{ width: '100%', height: 'auto', minHeight: 150 }}
          label={{
            color: rarity.color,
            content: rarity.name,
            icon: rarity.icon,
            ribbon: true,
          }}
        />
        <Card.Content>
          <Card.Header>
            {SpeciesNames[this.state.kryptomon.speciesId]}
          </Card.Header>
          <Card.Meta>
            <strong>Gen {this.state.kryptomon.generation}</strong>
          </Card.Meta>
          <Card.Description>
            <Label basic color="red" content="TYPE" horizontal />
            {this.state.species.isExtinct ? (
              <Label
                basic
                icon="exclamation triangle"
                color="black"
                content="Extinct"
                horizontal
              />
            ) : null}
            {this.isReadyToEvolve() ? (
              <Label basic color="green" content="Ready to Evolve" horizontal />
            ) : null}
            {this.isReadyToBreed() ? (
              <Label basic color="pink" content="Ready to Breed" horizontal />
            ) : null}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default KryptomonCard;
