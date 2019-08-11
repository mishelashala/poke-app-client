import { capitalize } from "lodash";
import { IPokemonDto } from "../dtos/PokemonDto";
import { IPokemon } from "../models/Pokemon";

const toEntity = (pokemonDto: IPokemonDto): IPokemon => {
  return {
    id: pokemonDto.name,
    name: capitalize(pokemonDto.name),
    types: [],
    picture: "",
    _meta: {
      isLoading: true,
      isCached: false
    }
  };
};

export default {
  toEntity
};
