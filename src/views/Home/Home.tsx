import React from "react";
import styled from "styled-components";
import { IPokemon } from "../../models";
import { PokemonList } from "../../modules/PokemonList";
import { IPokemonService } from "../../services/PokemonService";
import { ViewTitle } from "../../ui/";

interface IHomeViewState {
  isLoading: boolean;
  pokemons: IPokemon[];
}

const HomeWrapper = styled.main`
  padding: 1rem;
  box-sizing: border-box;
`;

export const HomeView = (pokemonService: IPokemonService) =>
  class extends React.Component<{}, IHomeViewState> {
    state = {
      isLoading: true,
      pokemons: []
    };

    async componentDidMount() {
      const data = await pokemonService.getAll();
      this.setState({
        isLoading: true,
        pokemons: data.results
      });
    }

    render() {
      return (
        <HomeWrapper>
          <ViewTitle>Pokemon List</ViewTitle>
          <PokemonList data={this.state.pokemons} />
        </HomeWrapper>
      );
    }
  };
