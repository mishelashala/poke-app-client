import React from "react";
import { Link } from "react-router-dom";
import apiGateway from "../../api-gateways/LocalApiGateway";
import {
  PokemonDetailsService,
  IPokemonDetailsService
} from "../../services/PokemonDetailsService";
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

  pokemonDetailsService: IPokemonDetailsService = PokemonDetailsService(
    apiGateway
  );

  async componentDidMount() {
    const pokemon = await this.pokemonDetailsService.getOneById(this.props.id);
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
