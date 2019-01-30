import axios from "axios";
import pokemonDetailsMapper from "../mappers/PokemonDetailsMapper";
import { IPokemonDetails, IPokemon } from "../models/";
import pokemonMapper from "../mappers/PokemonMapper";

export interface IGetAllPokemonResponse {
  results: IPokemon[];
}

// getOneById :: String -> Promise IGetAllPokemonResponse
const getAll = (): Promise<IGetAllPokemonResponse> => {
  return new Promise(async resolve => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon");
    resolve({
      ...res.data,
      results: res.data.results.map(pokemonMapper.toEntity)
    });
  });
};

// getOneById :: String -> Promise IPokemonDetails
const getOneById = (name: string): Promise<IPokemonDetails> => {
  return new Promise(async resolve => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    resolve(pokemonDetailsMapper.toEntity(res.data));
  });
};

export default {
  getAll,
  getOneById
};
