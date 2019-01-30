import { capitalize } from "lodash";
import { IPokemon, IPokemonDto } from "../models";

const toEntity = (pokemonDto: IPokemonDto): IPokemon => {
  return {
    id: pokemonDto.name,
    name: capitalize(pokemonDto.name)
  };
};

export default {
  toEntity
};
