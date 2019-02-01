import { lowerCase } from "lodash/fp";
import { IAppState } from "../../ducks";
import { IPokemon } from "../../models/";

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
  if (state.pokemons.search === "") {
    return state.pokemons.data;
  }

  return filterPokemonsByName(state.pokemons.search, state.pokemons.data);
};
