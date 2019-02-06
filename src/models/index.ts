// Redux Related
export interface IFluxStandardAction {
  error?: boolean;
  payload?: any;
  type: string;
}

// Pokemon
export interface IPokemon {
  id: string;
  name: string;
  types: string[];
  picture: string;
  _meta: {
    isLoading: boolean;
    isCached: boolean;
  };
}

export interface IPokemonDto {
  id: number;
  name: string;
  type: string[];
}

// Pokemon Types
export interface IPokemonTypeDto {
  slot: number;
  type: {
    name: string;
  };
}

export interface IPokemonMoveDto {
  move: {
    name: string;
  };
}

// Pokemon Details
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

export interface IPokemonDetails {
  abilities: string[];
  height: number;
  id: string;
  moves: string[];
  name: string;
  picture: string;
  types: string[];
  weight: number;
}

// Abilities
export interface IAbilityDto {
  ability: {
    name: string;
    url: string;
  };
}
