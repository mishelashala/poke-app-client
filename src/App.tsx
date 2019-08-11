import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { NavBar } from "./shared/molecules/NavBar";
import { PokemonRouter } from "./modules/Pokemon/PokemonRouter";
import { PokemonDetailsView } from "./views/PokemonDetails";
import { configureStore } from "./configureStore";

const App = () => (
  <Provider store={configureStore()}>
    <Router>
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/" exact component={PokemonRouter} />
          <Route path="/pokemon/:pokemonName" component={PokemonDetailsView} />
        </Switch>
      </React.Fragment>
    </Router>
  </Provider>
);

export default App;
