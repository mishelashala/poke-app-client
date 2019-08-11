import { lowerCase } from "lodash/fp";
import { IAppState } from "../../../shared/ducks";
import { IPokemon } from "../../models/Pokemon";

// toArray :: {[key: string]: T} -> T[]
const toArray = (json: any) =>
  Object.keys(json).map((key: string): any => json[key]);

// filterPokemonsByType :: (String[], IPokemon[]) -> IPokemon[]
export const filterPokemonsByType = (types: string[], pokemons: IPokemon[]) => {
  if (!types.length) {
    return pokemons;
  }

  return pokemons.filter((p: IPokemon) =>
    types.every((t: string) => p.types.includes(t))
  );
};

// filterPokemonsByName :: (String, IPokemon[]) -> IPokemon[]
export const filterPokemonsByName = (name = "", pokemons: IPokemon[]) => {
  if (!name) {
    return pokemons;
  }

  return pokemons.filter((pokemon: IPokemon) =>
    lowerCase(pokemon.name).includes(lowerCase(name))
  );
};

// getPokemons :: IPokemonState -> IPokemon[]
export const getPokemons = (state: IAppState): IPokemon[] => {
  const pokemonList = toArray(state.pokemons.data);

  return filterPokemonsByType(
    state.pokemons.filterByType,
    filterPokemonsByName(state.pokemons.search, pokemonList)
  );
};

// getError :: IAppState -> String
export const getError = (state: IAppState): string => {
  if (state.pokemons.error) {
    return state.pokemons.error.message;
  }

  return "";
};
