import { path } from "lodash/fp";
import { IAppState } from "../../shared/ducks";
import { IPokemonDetails } from "../../shared/models/PokemonDetails";

export const selectIsCached = path(["pokemons", "isCached"]);
export const selectIsLoading = path(["pokemons", "isLoading"]);
export const selectSearch = path(["pokemons", "search"]);

export const selectPokemon = (pokemonName: string) => (
  state: IAppState
): IPokemonDetails => {
  return state.pokemons.data[pokemonName] || {};
};

export const selectIsLoadingPokemon = (pokemonName: string) => (
  state: IAppState
) => {
  return (
    Object.keys(state.pokemons.data).length === 0 ||
    state.pokemons.data[pokemonName]._meta.isLoading
  );
};

export const selectIsCachedPokemon = (pokemonName: string) => (
  state: IAppState
) => {
  return (
    Object.keys(state.pokemons.data).length !== 0 &&
    state.pokemons.data[pokemonName]._meta.isCached
  );
};
