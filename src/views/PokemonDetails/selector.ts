import { IPokemonDetailsViewProps } from "./PokemonDetails";

// getPokemonName :: IPokemonDetailsViewProps -> String
export const getPokemonName = (ownProps: IPokemonDetailsViewProps) => {
  return ownProps.match.params.pokemonName.toLowerCase();
};

// getData :: (IAppState, String) -> IPokemon
export const getData = (state: any, pokemonName: string) => {
  return state.pokemons.data[pokemonName] || {};
};

// isLoading :: (IAppState, String) -> Boolean
export const isLoading = (state: any, pokemonName: string) => {
  const data = getData(state, pokemonName);
  return Object.keys(data).length === 0 || data._meta.isLoading;
};

// isCached :: (IAppState, String) -> Boolean
export const isCached = (state: any, pokemonName: string) => {
  const data = getData(state, pokemonName);
  return Object.keys(data).length !== 0 && data._meta.isCached;
};
