import axios from "axios";
import { IPokemon } from "../models/";
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

export default {
  getAll
};
