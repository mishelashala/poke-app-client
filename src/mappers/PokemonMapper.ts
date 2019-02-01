import { capitalize } from "lodash";
import { IPokemon, IPokemonDto } from "../models";

const toEntity = (pokemonDto: IPokemonDto): IPokemon => {
  return {
    id: pokemonDto.name,
    name: capitalize(pokemonDto.name),
    type: [],
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
