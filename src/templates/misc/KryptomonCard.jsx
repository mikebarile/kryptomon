import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import moment from 'moment';

import { getImageFromKryptomon } from 'src/util';
import { rarityById, Species, typeByName } from 'constants/Kryptomon';
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
    evolutionTime: moment('01-01-2090', 'MM-DD-YYYY'),
    breedingTime: moment('01-01-2090', 'MM-DD-YYYY'),
    speciesName: '',
    speciesTypes: [],
  };

  async componentDidMount() {
    const kryptomon = await getKryptomon(this.props.kryptomonId).call();
    const species = await getSpeciesDetails(kryptomon.speciesId).call();
    const imgSrc = getImageFromKryptomon(kryptomon);
    const evolutionTime = moment.unix(
      Number(kryptomon.birthTimeStamp) + Number(species._timeToEvolve),
    );
    const breedingTime = moment.unix(
      Number(kryptomon.lastBred) + Number(species._breedingCooldown),
    );

    this.setState({
      imgSrc,
      kryptomon,
      species,
      evolutionTime,
      breedingTime,
      speciesName: Species[kryptomon.speciesId].name,
      speciesTypes: Species[kryptomon.speciesId].types,
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
          <Card.Header>{this.state.speciesName}</Card.Header>
          <Card.Meta>
            <strong>Gen {this.state.kryptomon.generation}</strong> |{' '}
            <strong>Power Level {this.state.kryptomon.geneticValue}</strong>
          </Card.Meta>
          <Card.Description>
            {this.state.speciesTypes.map((type, idx) => (
              <Label
                key={idx}
                basic
                color={typeByName[type].color}
                content={type}
                horizontal
              />
            ))}
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
              <Label basic color="green" content="Can Evolve" horizontal />
            ) : null}
            {/* {this.isReadyToBreed() && this.state.kryptomon.speciesId !== '0' ? (
              <Label basic color="pink" content="Can Breed" horizontal />
            ) : null} */}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default KryptomonCard;
