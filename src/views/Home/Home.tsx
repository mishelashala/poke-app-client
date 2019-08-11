import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PokemonList } from "../../modules/PokemonList";
import { FilterByType } from "../../modules/FilterByType";
import { ViewTitle, SearchBar, Wrapper } from "../../ui/";
import { HomeViewLoading } from "./HomeViewLoading";
import * as pokemons from "../../ducks/pokemons";
const pokemonService = PokemonService(apiGateway);
import apiGateway from "../../gateways/HttpApiGateway";
import { PokemonService } from "../../services/PokemonService";
import { IAppState } from "../../ducks";

const thunks = pokemons.pokemonThunks(pokemonService);

export const HomeView: React.FC = () => {
  const dispatch = useDispatch();
  const isCached = useSelector((state: IAppState) => state.pokemons.isCached);
  const isLoading = useSelector((state: IAppState) => state.pokemons.isLoading);
  const search = useSelector((state: IAppState) => state.pokemons.search);

  const onChangeSearch = ({
    target: { value = "" }
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(pokemons.searchChanged(value));
  };

  useEffect(() => {
    if (!isCached) {
      dispatch(thunks.fetchAllPokemons());
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
