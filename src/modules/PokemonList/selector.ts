import { lowerCase } from "lodash/fp";
import { IAppState } from "../../ducks";
import { IPokemon } from "../../models/";

// toArray :: {[key: string]: T} -> T[]
const toArray = (json: any) =>
  Object.keys(json).map((key: string): any => json[key]);

// filterPokemonsByType :: (String[], IPokemon[]) -> IPokemon[]
export const filterPokemonsByType = (types: string[], pokemons: IPokemon[]) => {
  if (!types.length) {
    return pokemons;
  }

  return pokemons.filter((p: IPokemon) =>
    types.every((t: string) => p.type.includes(t))
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
