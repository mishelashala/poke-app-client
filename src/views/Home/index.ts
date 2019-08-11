import { HomeViewFactory } from "./Home";
import apiGateway from "../../gateways/HttpApiGateway";
import { PokemonService } from "../../services/PokemonService";
import * as pokemons from "../../ducks/pokemons";

const pokemonService = PokemonService(apiGateway);
const pokemonThunks = pokemons.pokemonThunks(pokemonService);

export const HomeView = HomeViewFactory(pokemonThunks);
