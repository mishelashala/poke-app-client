import React from "react";
import styled from "styled-components";
import { IPokemon } from "../../models";
import { PokemonList } from "../../modules/PokemonList";
import { IPokemonService } from "../../services/PokemonService";
import { ViewTitle, LoadingCard, LoadingTitle } from "../../ui/";

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
        isLoading: false,
        pokemons: data.results
      });
    }

    render() {
      if (this.state.isLoading) {
        return (
          <HomeWrapper>
            <LoadingTitle />
            <LoadingCard />
            <LoadingCard />
          </HomeWrapper>
        );
      }

      return (
        <HomeWrapper>
          <ViewTitle>Pokemon List</ViewTitle>
          <PokemonList data={this.state.pokemons} />
        </HomeWrapper>
      );
    }
  };
