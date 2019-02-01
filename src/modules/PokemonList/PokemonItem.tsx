import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import apiGateway from "../../api-gateways/HttpApiGateway";
import {
  PokemonDetailsService,
  IPokemonDetailsService
} from "../../services/PokemonDetailsService";
import { Text, PokemonCard, PokemonDetails, LoadingImage } from "../../ui";
import { TypeList } from "../TypeList";

const PokemonItemImage = styled.img`
  margin: 0.5rem auto;
`;

const PokemonTypes = styled.div`
  margin: 0.75rem 0 0.25rem 0;
`;

interface IPokemonItemProps {
  id: string;
  name: string;
}

interface IPokemonItemState {
  isLoading: boolean;
  data: {
    picture: string;
    types: string[];
  };
}

export class PokemonItem extends React.Component<
  IPokemonItemProps,
  IPokemonItemState
> {
  state = {
    isLoading: true,
    data: {
      picture: "",
      types: []
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
          {this.state.isLoading && <LoadingImage />}
          {!this.state.isLoading && (
            <PokemonItemImage src={this.state.data.picture} />
          )}
          <PokemonDetails>
            <Text>{this.props.name}</Text>
            <PokemonTypes>
              <TypeList data={this.state.data.types} />
            </PokemonTypes>
          </PokemonDetails>
        </PokemonCard>
      </Link>
    );
  }
}
