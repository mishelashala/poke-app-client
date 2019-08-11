import pokemonReducer, { IPokemonState } from "./pokemons";
export { pokemonReducer };

export interface IAppState {
  pokemons: IPokemonState;
}
