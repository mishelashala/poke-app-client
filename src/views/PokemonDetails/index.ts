import apiGateway from "../../shared/gateways/HttpApiGateway";
import * as pokemons from "../../ducks/pokemons";
import { PokemonDetailsService } from "../../shared/services/PokemonDetailsService";
import { IPokemonDetails } from "../../shared/models/PokemonDetails";

export interface IPokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
}

import { PokemonDetailsViewFactory } from "./PokemonDetails";
const pokemonDetailsService = PokemonDetailsService(apiGateway);
const pokemonDetailsThunks = pokemons.pokemonDeailsThunks(
  pokemonDetailsService
);

export const PokemonDetailsView = PokemonDetailsViewFactory(
  pokemonDetailsThunks
);
