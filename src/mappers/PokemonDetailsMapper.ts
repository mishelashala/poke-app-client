import { capitalize } from "lodash/fp";
import {
  IPokemonDetails,
  IPokemonDetailsDto,
  IPokemonTypeDto
} from "../models";

// getTypes :: IPokemonTypeDto[] -> String[]
export const getTypes = (types: any): string[] => {
  return types.reduce((acc: string[], data: IPokemonTypeDto) => {
    return [...acc, data.type.name];
  }, []);
};

// toEntity :: IPokemonDetailsDto -> IPokemonDetails
const toEntity = (detailsDto: IPokemonDetailsDto): IPokemonDetails => {
  return {
    id: detailsDto.id,
    name: capitalize(detailsDto.name),
    picture: detailsDto.sprites.front_default,
    types: getTypes(detailsDto.types),
    weight: detailsDto.weight
  };
};

export default {
  toEntity
};
