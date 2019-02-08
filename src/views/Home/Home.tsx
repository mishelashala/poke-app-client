import React, { useEffect } from "react";
import { PokemonList } from "../../modules/PokemonList";
import { FilterByType } from "../../modules/FilterByType";
import { ViewTitle, SearchBar, Wrapper } from "../../ui/";
import { HomeViewLoading } from "./HomeViewLoading";

interface IHomeViewProps {
  isCached: boolean;
  isLoading: boolean;
  fetchPokemons: () => any;
  search: string;
  handleSearchChange: (e: any) => void;
}

export const HomeView: React.FC<IHomeViewProps> = props => {
  useEffect(() => {
    if (!props.isCached) {
      props.fetchPokemons();
    }
  });

  if (props.isLoading) {
    return <HomeViewLoading />;
  }

  return (
    <Wrapper>
      <ViewTitle>Pokemon List</ViewTitle>
      <SearchBar
        placeholder="Search pokemon by name"
        type="search"
        value={props.search}
        onChange={props.handleSearchChange}
      />

      <FilterByType />

      <PokemonList />
    </Wrapper>
  );
};
