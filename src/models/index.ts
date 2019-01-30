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
