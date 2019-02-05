export interface IPokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
}

export { PokemonDetailsViewContainer as PokemonDetailsView } from "./container";
