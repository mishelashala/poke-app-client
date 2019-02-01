// Pokemon
export interface IPokemon {
  id: string;
  name: string;
  type: string[];
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

// Pokemon Details
export interface IPokemonDetailsDto {
  id: string;
  name: string;
  sprites: {
    front_default: string;
  };
  types: IPokemonTypeDto[];
  weight: number;
}

export interface IPokemonDetails {
  id: string;
  name: string;
  picture: string;
  types: string[];
  weight: number;
}
