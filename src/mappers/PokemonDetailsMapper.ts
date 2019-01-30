import { capitalize } from "lodash/fp";
import { IPokemonDetails, IPokemonDetailsDto } from "../models";

// toEntity :: IPokemonDetailsDto -> IPokemonDetails
const toEntity = (detailsDto: IPokemonDetailsDto): IPokemonDetails => {
  return {
    id: detailsDto.id,
    name: capitalize(detailsDto.name),
    picture: detailsDto.sprites.front_default,
    weight: detailsDto.weight
  };
};

export default {
  toEntity
};
