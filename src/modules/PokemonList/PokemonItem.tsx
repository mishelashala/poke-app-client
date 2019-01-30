import React from "react";
import { Link } from "react-router-dom";
import pokemonService from "../../services/PokemonService";
import { Text, PokemonCard, PokemonDetails } from "../../ui";

interface IPokemonItemProps {
  id: string;
  name: string;
}

export class PokemonItem extends React.Component<IPokemonItemProps> {
  state = {
    data: {
      picture: ""
    }
  };

  async componentDidMount() {
    const pokemon = await pokemonService.getOneById(this.props.id);
    this.setState({
      isLoading: false,
      data: { ...pokemon }
    });
  }

  render() {
    return (
      <Link to={`/pokemon/${this.props.id}`}>
        <PokemonCard>
          <img src={this.state.data.picture} />
          <PokemonDetails>
            <Text>{this.props.name}</Text>
          </PokemonDetails>
        </PokemonCard>
      </Link>
    );
  }
}
