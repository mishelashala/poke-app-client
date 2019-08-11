import { IPokemon } from "../models/Pokemon";
import pokemonMapper from "../mappers/PokemonMapper";
import * as serviceErrorStrategy from "../strategies/ServiceErrorStrategy";

export interface IGetAllPokemonResponse {
  results: IPokemon[];
}

export interface IPokemonService {
  getAll: () => Promise<IGetAllPokemonResponse>;
}

export const PokemonService = (gateway: any): IPokemonService => {
  // getAll :: String -> Promise IGetAllPokemonResponse
  const getAll = (): Promise<IGetAllPokemonResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await gateway.getPokemons();
        resolve({
          ...res.data,
          results: res.data.results.map(pokemonMapper.toEntity)
        });
      } catch (err) {
        reject(serviceErrorStrategy.handleError(err));
      }
    });
  };

  return {
    getAll
  };
};
