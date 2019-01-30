import axios from "axios";
import pokemonDetailsMapper from "../mappers/PokemonDetailsMapper";
import { IPokemonDetails } from "../models/";

// getOneById :: String -> Promise IPokemonDetails
const getOneById = (name: string): Promise<IPokemonDetails> => {
  return new Promise(async resolve => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    resolve(pokemonDetailsMapper.toEntity(res.data));
  });
};

export default {
  getOneById
};
