import React from 'react';
import { Card, Image } from 'semantic-ui-react';

import { getImageFromKryptomonId } from 'src/util';
import { rarityById } from 'constants/Kryptomon';
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
    imgSrc: '',
    kryptomon: {},
    species: {},
  };

  async componentDidMount() {
    const imgSrc = await getImageFromKryptomonId(this.props.kryptomonId);
    const kryptomon = await getKryptomon(this.props.kryptomonId).call();
    const species = await getSpeciesDetails(kryptomon.speciesId).call();
    this.setState({ imgSrc, kryptomon, species });
  }

  render() {
    const rarity = rarityById[this.state.species._rarity] || {};
    return (
      <Card link={this.props.link} onClick={this.props.onClick}>
        <Image
          src={this.state.imgSrc}
          style={{ width: '100%', height: 'auto' }}
          label={{
            color: rarity.color,
            content: rarity.name,
            icon: rarity.icon,
            ribbon: true,
          }}
        />
        <Card.Content>
          <Card.Header>Species Name</Card.Header>
          <Card.Meta>
            <strong>Gen {this.state.kryptomon.generation}</strong>
          </Card.Meta>
          <Card.Description>
            Some basic stats about this Kryptomon! <br />
            Maybe attack, defense, how old it is?
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default KryptomonCard;
