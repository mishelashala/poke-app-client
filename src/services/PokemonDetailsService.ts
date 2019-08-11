import pokemonDetailsMapper from "../mappers/PokemonDetailsMapper";
import { IPokemonDetails } from "../models/";

export interface IPokemonDetailsService {
  getDetailsByName: (name: string) => Promise<IPokemonDetails>;
}

export const PokemonDetailsService = (
  apiGateway: any
): IPokemonDetailsService => {
  // getDetailsByName :: String -> Promise IPokemonDetails
  const getDetailsByName = async (name: string): Promise<IPokemonDetails> => {
    try {
      const res = await apiGateway.getPokemonDetails(name);
      return Promise.resolve(pokemonDetailsMapper.toEntity(res.data));
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return {
    getDetailsByName
  };
};
