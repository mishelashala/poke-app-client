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
    return new Promise(async resolve => {
      const res = await apiGateway.getPokemonDetails(name);
      resolve(pokemonDetailsMapper.toEntity(res.data));
    });
  };

  return {
    getDetailsByName
  };
};
