import React from "react";
import { IPokemonDetailsService } from "../../services/PokemonDetailsService";
import { IPokemonDetails } from "../../models/";
import { PokemonCard, PokemonDetails, ViewTitle } from "../../ui";
import { TypeList } from "../../modules/TypeList";
import {
  PokemonDetailsWrapper,
  DetailsViewTitle,
  TypeListWrapper,
  AbilityLabel,
  DetailsText,
  Name,
  DetailsTypeWrapper
} from "./ui";

interface IPokemonDetailsViewProps {
  match: {
    params: {
      pokemonName: string;
    };
  };
}

interface IPokemonDetailsViewState {
  isLoading: boolean;
  data: IPokemonDetails;
}

export const PokemonDetailsView = (
  pokemonDetailsService: IPokemonDetailsService
) => {
  return class extends React.Component<
    IPokemonDetailsViewProps,
    IPokemonDetailsViewState
  > {
    state = {
      isLoading: true,
      data: {
        abilities: [],
        height: 0,
        id: "",
        moves: [],
        name: "",
        picture: "",
        types: [],
        weight: 0
      }
    };

    async componentDidMount() {
      const data = await pokemonDetailsService.getDetailsByName(
        this.props.match.params.pokemonName.toLowerCase()
      );

      this.setState({
        isLoading: false,
        data
      });
    }

    render() {
      return (
        <PokemonDetailsWrapper>
          <ViewTitle>Pokemon Details</ViewTitle>
          <div style={{ boxSizing: "border-box", textAlign: "center" }}>
            <PokemonCard>
              <img src={this.state.data.picture} />
              <PokemonDetails>
                <Name>{this.state.data.name}</Name>
                <DetailsText>Height: {this.state.data.height}'</DetailsText>
                <DetailsText>Weight: {this.state.data.weight}kgs</DetailsText>
              </PokemonDetails>
            </PokemonCard>

            <DetailsViewTitle>Type</DetailsViewTitle>
            <TypeListWrapper>
              <TypeList data={this.state.data.types} />
            </TypeListWrapper>

            <DetailsViewTitle>Abilities</DetailsViewTitle>
            <DetailsTypeWrapper>
              {this.state.data.abilities.map((ability: string) => {
                return <AbilityLabel key={ability}>{ability}</AbilityLabel>;
              })}
            </DetailsTypeWrapper>

            <DetailsViewTitle>Moves</DetailsViewTitle>
            <DetailsTypeWrapper>
              {this.state.data.moves.map((move: string) => {
                return <AbilityLabel key={move}>{move}</AbilityLabel>;
              })}
            </DetailsTypeWrapper>
          </div>
        </PokemonDetailsWrapper>
      );
    }
  };
};
