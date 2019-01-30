import { capitalize } from "lodash/fp";

export interface IPokemonDetailsDto {
  id: string;
  name: string;
  sprites: {
    front_default: string;
  };
  weight: number;
}

export interface IPokemonDetails {
  id: string;
  name: string;
  picture: string;
  weight: number;
}

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
