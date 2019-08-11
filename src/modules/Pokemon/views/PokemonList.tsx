import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PokemonList } from "../../../shared/molecules/PokemonList";
import { FilterByType } from "../../../shared/molecules/FilterByType";
import { ViewTitle } from "../../../shared/atoms/ViewTitle";
import { SearchBar } from "../../../shared/atoms/SearchBar";
import { Wrapper } from "../../../shared/atoms/Wrapper";
import { HomeViewLoading } from "../molecules/HomeViewLoading";
import * as pokemonDucks from "../../../shared/ducks/pokemons";
import * as pokemonSelector from "../selectors";

export const PokemonListViewFactory = (
  pokemonThunks: pokemonDucks.IPokemonThunks
) => {
  const PokemonListView: React.FC = () => {
    const dispatch = useDispatch();
    const isCached = useSelector(pokemonSelector.selectIsCached);
    const isLoading = useSelector(pokemonSelector.selectIsLoading);
    const search = useSelector(pokemonSelector.selectSearch);

    const onChangeSearch = ({
      target: { value = "" }
    }: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(pokemonDucks.searchChanged(value));
    };

    useEffect(() => {
      if (!isCached) {
        dispatch(pokemonThunks.fetchAllPokemons());
      }
    }, []);

    if (isLoading) {
      return <HomeViewLoading />;
    }

    return (
      <Wrapper>
        <ViewTitle>Pokemon List</ViewTitle>
        <SearchBar
          placeholder="Search pokemon by name"
          type="search"
          value={search}
          onChange={onChangeSearch}
        />

        <FilterByType />

        <PokemonList />
      </Wrapper>
    );
  };

  return PokemonListView;
};
