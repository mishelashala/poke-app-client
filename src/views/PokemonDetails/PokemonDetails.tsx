import React from "react";
import styled from "styled-components";
import pokemonDetailsService from "../../services/PokemonDetailsService";
import { IPokemonDetails } from "../../models/";
import { Text, PokemonCard, PokemonDetails, ViewTitle } from "../../ui";

const PokemonDetailsWrapper = styled.section`
  box-sizing: border-box;
  padding: 1rem;
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

export class PokemonDetailsView extends React.Component<
  IPokemonDetailsViewProps,
  IPokemonDetailsViewState
> {
  state = {
    isLoading: true,
    data: {
      id: "",
      name: "",
      picture: "",
      types: [],
      weight: 0
    }
  };

  async componentDidMount() {
    const data = await pokemonDetailsService.getOneById(
      this.props.match.params.pokemonName
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
              <Text>{this.state.data.name}</Text>
            </PokemonDetails>
          </PokemonCard>

          <div>
            <Text>Details</Text>
            <Text>Weight: {this.state.data.weight}</Text>
          </div>
        </div>
      </PokemonDetailsWrapper>
    );
  }
}
