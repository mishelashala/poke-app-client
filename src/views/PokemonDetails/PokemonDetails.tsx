import React from "react";
import styled from "styled-components";
import pokemonService from "../../services/PokemonService";
import { IPokemonDetails } from "../../models/";
import { Text, PokemonCard, PokemonDetails } from "../../ui";

const PokemonDetailsWrapper = styled.section`
  box-sizing: border-box;
  padding: 1rem;
`;

const PokemonDetailsTitle = styled.h2`
  font-family: arial;
  margin: 0 0 0.75rem 0;
  font-size: 1.2rem;
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
      weight: 0
    }
  };

  async componentDidMount() {
    const data = await pokemonService.getOneById(
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
        <PokemonDetailsTitle>Pokemon Details</PokemonDetailsTitle>
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
