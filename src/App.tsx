import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "./modules/NavBar";
import apiGateway from "./api-gateways/LocalApiGateway";
import { PokemonDetailsService } from "./services/PokemonDetailsService";
import { HomeView } from "./views/Home";
import { PokemonDetailsView } from "./views/PokemonDetails";
import { PokemonService } from "./services/PokemonService";

interface IPokemon {
  name: string;
  url: string;
}

interface IAppState {
  pokemons: IPokemon[];
}

const withLocalPokemonDetailsService = (factory: Function) => {
  return factory(PokemonDetailsService(apiGateway));
};

const withLocalPokemonService = (factory: Function) => {
  return factory(PokemonService(apiGateway));
};

class App extends React.Component<{}, IAppState> {
  render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar />
          <Switch>
            <Route
              path="/"
              exact
              component={withLocalPokemonService(HomeView)}
            />
            <Route
              path="/pokemon/:pokemonName"
              component={withLocalPokemonDetailsService(PokemonDetailsView)}
            />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
