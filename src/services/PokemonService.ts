import { IPokemon } from "../models/";
import pokemonMapper from "../mappers/PokemonMapper";

export interface IGetAllPokemonResponse {
  results: IPokemon[];
}

export interface IPokemonService {
  getAll: () => Promise<IGetAllPokemonResponse>;
}

export const PokemonService = (gateway: any): IPokemonService => {
  // getAll :: String -> Promise IGetAllPokemonResponse
  const getAll = (): Promise<IGetAllPokemonResponse> => {
    return new Promise(resolve => {
      setTimeout(async () => {
        const res = await gateway.getPokemons();
        resolve({
          ...res.data,
          results: res.data.results.map(pokemonMapper.toEntity)
        });
      }, 1500);
    });
  };

  return {
    getAll
  };
};
