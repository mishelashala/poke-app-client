import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NavBar } from "./modules/NavBar";
import { HomeView } from "./views/Home";
import { PokemonDetailsView } from "./views/PokemonDetails";

interface IPokemon {
  name: string;
  url: string;
}

interface IAppState {
  pokemons: IPokemon[];
}

class App extends React.Component<{}, IAppState> {
  render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar />
          <Switch>
            <Route path="/" exact component={HomeView} />
            <Route
              path="/pokemon/:pokemonName"
              component={PokemonDetailsView}
            />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
