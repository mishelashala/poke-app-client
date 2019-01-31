import React from "react";
import styled from "styled-components";
import { lowerCase } from "lodash/fp";
import { IPokemon } from "../../models";
import { PokemonList } from "../../modules/PokemonList";
import { IPokemonService } from "../../services/PokemonService";
import { ViewTitle, LoadingCard, LoadingTitle, SearchBar } from "../../ui/";

// filterSearchResults :: (String, IPokemon[]) -> IPokemon[]
const filterSearchResults = (name = "", pokemons: IPokemon[]) => {
  if (!name) {
    return pokemons;
  }

  return pokemons.filter((pokemon: IPokemon) =>
    lowerCase(pokemon.name).includes(lowerCase(name))
  );
};

interface IHomeViewState {
  isLoading: boolean;
  pokemons: IPokemon[];
  search: string;
}

const HomeWrapper = styled.main`
  padding: 1rem;
  box-sizing: border-box;
`;

export const HomeView = (pokemonService: IPokemonService) =>
  class extends React.Component<{}, IHomeViewState> {
    state = {
      isLoading: true,
      search: "",
      pokemons: []
    };

    async componentDidMount() {
      const data = await pokemonService.getAll();
      this.setState({
        isLoading: false,
        pokemons: data.results
      });
    }

    handleSearchChange = ({ target: { value } }: any) => {
      this.setState({ search: value });
    };

    render() {
      if (this.state.isLoading) {
        return (
          <HomeWrapper>
            <LoadingTitle />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </HomeWrapper>
        );
      }

      return (
        <HomeWrapper>
          <ViewTitle>Pokemon List</ViewTitle>
          <SearchBar
            placeholder="Search pokemon by name"
            type="search"
            value={this.state.search}
            onChange={this.handleSearchChange}
          />
          <PokemonList
            data={filterSearchResults(this.state.search, this.state.pokemons)}
          />
        </HomeWrapper>
      );
    }
  };
