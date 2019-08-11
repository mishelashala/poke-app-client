import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { PokemonListViewFactory } from "./views/PokemonList";
import apiGateway from "../../shared/gateways/HttpApiGateway";
import { PokemonService } from "../../shared/services/PokemonService";
import { PokemonDetailsService } from "../../shared/services/PokemonDetailsService";
import { PokemonDetailsViewFactory } from "./views/PokemonDetails";
import * as pokemons from "../../ducks/pokemons";

const pokemonService = PokemonService(apiGateway);
const pokemonThunks = pokemons.pokemonThunks(pokemonService);
const pokemonDetailsService = PokemonDetailsService(apiGateway);
const pokemonDetailsThunks = pokemons.pokemonDeailsThunks(
  pokemonDetailsService
);

export const PokemonListView = PokemonListViewFactory(pokemonThunks);
export const PokemonDetailsView = PokemonDetailsViewFactory(
  pokemonDetailsThunks
);

export const PokemonRouter = (props: any) => (
  <React.Fragment>
    <Switch>
      <Route
        path={`${props.match.url}`}
        component={PokemonListView}
        exact={true}
      />
      <Route
        path={`${props.match.url}/:pokemonName`}
        component={PokemonDetailsView}
      />
    </Switch>
  </React.Fragment>
);
