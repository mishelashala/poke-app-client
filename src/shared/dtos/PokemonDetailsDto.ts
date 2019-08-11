import { IAbilityDto } from "./AbilityDto";
import { IPokemonMoveDto } from "../../shared/dtos/PokemonMoveDto";
import { IPokemonTypeDto } from "../../shared/dtos/PokemonTypeDto";

export interface IPokemonDetailsDto {
  abilities: IAbilityDto[];
  height: number;
  id: string;
  moves: IPokemonMoveDto[];
  name: string;
  sprites: {
    front_default: string;
  };
  types: IPokemonTypeDto[];
  weight: number;
}
