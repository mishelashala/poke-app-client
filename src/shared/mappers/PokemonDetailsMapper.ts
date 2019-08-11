import { capitalize } from "lodash/fp";
import { IPokemonMoveDto } from "../dtos/PokemonMoveDto";
import { IAbilityDto } from "../dtos/AbilityDto";
import { IPokemonDetailsDto } from "../dtos/PokemonDetailsDto";
import { IPokemonTypeDto } from "../dtos/PokemonTypeDto";
import { IPokemonDetails } from "../models/PokemonDetails";

// getAbilities :: IAbilityDto[] -> String[]
export const getAbilities = (abilities: IAbilityDto[]): string[] => {
  return abilities.map((data: IAbilityDto) => data.ability.name);
};

// getTypes :: IPokemonTypeDto[] -> String[]
export const getTypes = (types: IPokemonTypeDto[]): string[] => {
  return types.reduce((acc: string[], data: IPokemonTypeDto) => {
    return [...acc, data.type.name];
  }, []);
};

// getMoves :: IPokemonMoveDto[] -> String[]
export const getMoves = (moves: IPokemonMoveDto[]): string[] => {
  // only first three
  const [a, b, c] = moves;
  return [a, b, c].reduce((acc: any[], data: IPokemonMoveDto) => {
    return [...acc, data.move.name];
  }, []);
};

// toEntity :: IPokemonDetailsDto -> IPokemonDetails
const toEntity = (detailsDto: IPokemonDetailsDto): IPokemonDetails => {
  return {
    abilities: getAbilities(detailsDto.abilities),
    height: detailsDto.height,
    id: detailsDto.id,
    moves: getMoves(detailsDto.moves),
    name: capitalize(detailsDto.name),
    picture: detailsDto.sprites.front_default,
    types: getTypes(detailsDto.types),
    weight: detailsDto.weight
  };
};

export default {
  toEntity
};
