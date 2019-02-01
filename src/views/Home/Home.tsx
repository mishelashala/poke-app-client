import React from "react";
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
  search: string;
  handleSearchChange: (e: any) => void;
}

export class HomeView extends React.Component<IHomeViewProps> {
  async componentDidMount() {
    if (!this.props.isCached) {
      this.props.fetchPokemons();
    }
  }

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
          value={this.props.search}
          onChange={this.props.handleSearchChange}
        />

        <FilterByType />

        <PokemonList />
      </Wrapper>
    );
  }
}
