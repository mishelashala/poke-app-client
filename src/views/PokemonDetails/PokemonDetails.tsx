import React from "react";
import styled from "styled-components";
import { IPokemonDetailsService } from "../../services/PokemonDetailsService";
import { IPokemonDetails } from "../../models/";
import { Text, PokemonCard, PokemonDetails, ViewTitle } from "../../ui";
import { TypeList } from "../../modules/TypeList";

const PokemonDetailsWrapper = styled.section`
  box-sizing: border-box;
  padding: 1rem;
`;

const DetailsViewTitle = styled(ViewTitle)`
  margin-bottom: 0.25rem;
  text-align: left;
`;

const TypeListWrapper = styled.div`
  margin-bottom: 1.25rem;
  text-align: left;
`;

const AbilityLabel = styled(Text)`
  background-color: #f2f2f2;
  border-radius: 1rem;
  color: black;
  display: inline-block;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
`;

const DetailsText = styled(Text)`
  margin-top: 0.2rem;
`;

const Name = styled(Text)`
  margin-bottom: 0.5rem;
`;

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
            <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
              {this.state.data.abilities.map((ability: string) => {
                return <AbilityLabel key={ability}>{ability}</AbilityLabel>;
              })}
            </div>

            <DetailsViewTitle>Moves</DetailsViewTitle>
            <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
              {this.state.data.moves.map((move: string) => {
                return <AbilityLabel key={move}>{move}</AbilityLabel>;
              })}
            </div>
          </div>
        </PokemonDetailsWrapper>
      );
    }
  };
};
