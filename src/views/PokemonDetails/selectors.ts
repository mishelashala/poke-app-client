import { IAppState } from "../../ducks";
import { IPokemonDetails } from "../../models";

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