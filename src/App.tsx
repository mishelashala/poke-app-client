import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { NavBar } from "./modules/NavBar";
import apiGateway from "./api-gateways/LocalApiGateway";
import { PokemonDetailsService } from "./services/PokemonDetailsService";
import { HomeView } from "./views/Home";
import { PokemonDetailsView } from "./views/PokemonDetails";
import { store } from "./configureStore";

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

class App extends React.Component<{}, IAppState> {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <NavBar />
            <Switch>
              <Route path="/" exact component={HomeView} />
              <Route
                path="/pokemon/:pokemonName"
                component={withLocalPokemonDetailsService(PokemonDetailsView)}
              />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
