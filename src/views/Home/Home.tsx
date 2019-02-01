import React from "react";
// import { lowerCase } from "lodash/fp";
import { IPokemon } from "../../models";
import { PokemonList } from "../../modules/PokemonList";
import { FilterByType } from "../../modules/FilterByType";
import {
  ViewTitle,
  LoadingCard,
  LoadingTitle,
  SearchBar,
  Wrapper
} from "../../ui/";

interface IHomeViewProps {
  isCached: boolean;
  isLoading: boolean;
  fetchPokemons: () => any;
}

interface IHomeViewState {
  pokemons: IPokemon[];
  search: string;
}

export class HomeView extends React.Component<IHomeViewProps, IHomeViewState> {
  state = {
    search: "",
    pokemons: []
  };

  async componentDidMount() {
    if (!this.props.isCached) {
      this.props.fetchPokemons();
    }
  }

  handleSearchChange = ({ target: { value } }: any) => {
    this.setState({ search: value });
  };

  render() {
    if (this.props.isLoading) {
      return (
        <Wrapper>
          <LoadingTitle />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <ViewTitle>Pokemon List</ViewTitle>
        <SearchBar
          placeholder="Search pokemon by name"
          type="search"
          value={this.state.search}
          onChange={this.handleSearchChange}
        />

        <FilterByType />

        <PokemonList />
      </Wrapper>
    );
  }
}
