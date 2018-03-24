import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import { withRouter } from 'react-router';

import { getImageFromSpeciesId } from 'src/util';
import { rarityById, Species, typeByName } from 'constants/Kryptomon';
import KryptomonKore from 'src/KryptomonKore';
import ROUTES from 'constants/Routes';

// Unpack KryptomonKore methods
const { getSpeciesDetails } = KryptomonKore.methods;

class BestiaryCard extends React.Component {
  state = {
    imgSrc: '', // Maybe load a placeholder locally?
    species: {},
    speciesName: '',
    speciesTypes: [],
  };

  async componentDidMount() {
    const species = await getSpeciesDetails(this.props.speciesId).call();
    const imgSrc = getImageFromSpeciesId(this.props.speciesId);

    this.setState({
      imgSrc,
      species,
      speciesName: Species[this.props.speciesId].name,
      speciesTypes: Species[this.props.speciesId].types,
    });
  }

  render() {
    const rarity = rarityById[this.state.species._rarity] || {};
    return (
      <Card
        link
        onClick={() =>
          this.props.history.push(ROUTES.BESTIARY + `/${this.props.speciesId}`)
        }
      >
        <Image
          src={this.state.imgSrc}
          style={{ width: '100%', height: 'auto', minHeight: 283 }}
          label={{
            color: rarity.color,
            content: rarity.name,
            icon: rarity.icon,
            ribbon: true,
          }}
        />
        <Card.Content>
          <Card.Header>{this.state.speciesName}</Card.Header>
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
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default withRouter(BestiaryCard);
