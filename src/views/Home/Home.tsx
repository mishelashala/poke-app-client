import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PokemonList } from "../../modules/PokemonList";
import { FilterByType } from "../../modules/FilterByType";
import { ViewTitle, SearchBar, Wrapper } from "../../ui/";
import { HomeViewLoading } from "./molecules/HomeViewLoading";
import * as pokemonDucks from "../../ducks/pokemons";
import * as pokemonSelector from "./selectors";

export const HomeViewFactory = (pokemonThunks: pokemonDucks.IPokemonThunks) => {
  const HomeView: React.FC = () => {
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

  return HomeView;
};
