import axios from "axios";
import { IPokemon } from "../modules/PokemonList";
import pokemonDetailsMapper, {
  IPokemonDetails
} from "../mappers/PokemonDetailsMapper";

export interface IGetAllPokemonResponse {
  results: IPokemon[];
}

// getOneByName :: String -> Promise IGetAllPokemonResponse
const getAll = (): Promise<IGetAllPokemonResponse> => {
  return new Promise(async resolve => {
    const res = await axios.get("https://pokeapi.co/api/v2/pokemon");
    resolve(res.data);
  });
};

// getOneByName :: String -> Promise IPokemonDetails
const getOneByName = (name: string): Promise<IPokemonDetails> => {
  return new Promise(async resolve => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    resolve(pokemonDetailsMapper.toEntity(res.data));
  });
};

export default {
  getAll,
  getOneByName
};
