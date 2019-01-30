import axios from "axios";
import { IPokemon } from "../modules/PokemonList";
import pokemonDetailsMapper from "../mappers/PokemonDetailsMapper";
import { IPokemonDetails } from "../models/";

export interface IGetAllPokemonResponse {
  results: IPokemon[];
}

// getOneById :: String -> Promise IGetAllPokemonResponse
const getAll = (): Promise<IGetAllPokemonResponse> => {
  return new Promise(async resolve => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon");
    resolve(res.data);
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
