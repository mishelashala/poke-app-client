import * as React from "react";
import { Route } from "react-router-dom";
import { PokemonListViewFactory } from "./views/PokemonList";
import apiGateway from "../../shared/gateways/HttpApiGateway";
import { PokemonService } from "../../shared/services/PokemonService";
import * as pokemons from "../../ducks/pokemons";

const pokemonService = PokemonService(apiGateway);
const pokemonThunks = pokemons.pokemonThunks(pokemonService);

export const PokemonList = PokemonListViewFactory(pokemonThunks);

export const PokemonRouter = () => (
  <React.Fragment>
    <Route path="/" component={PokemonList} exact={true} />
    {/* <Route path="/" component={PokemonDetail} exact={true} /> */}
  </React.Fragment>
);
