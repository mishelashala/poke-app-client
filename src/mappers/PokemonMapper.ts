import { capitalize } from "lodash";
import { IPokemon, IPokemonDto } from "../models";

const toEntity = (pokemonDto: IPokemonDto): IPokemon => {
  return {
    id: pokemonDto.name,
    name: capitalize(pokemonDto.name),
    type: []
  };
};

export default {
  toEntity
};
