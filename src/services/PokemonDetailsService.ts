import pokemonDetailsMapper from "../mappers/PokemonDetailsMapper";
import { IPokemonDetails } from "../models/";

export interface IPokemonDetailsService {
  getDetailsByName: (name: string) => Promise<IPokemonDetails>;
}

export const PokemonDetailsService = (
  apiGateway: any
): IPokemonDetailsService => {
  // getDetailsByName :: String -> Promise IPokemonDetails
  const getDetailsByName = (name: string): Promise<IPokemonDetails> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await apiGateway.getPokemonDetails(name);
        resolve(pokemonDetailsMapper.toEntity(res.data));
      } catch (err) {
        reject(err);
      }
    });
  };

  return {
    getDetailsByName
  };
};
