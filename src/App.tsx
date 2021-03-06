import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import { NavBar } from "./shared/molecules/NavBar";
import { PokemonRouter } from "./modules/Pokemon/PokemonRouter";
import { configureStore } from "./configureStore";

const App = () => (
  <Provider store={configureStore()}>
    <Router>
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route
            path="/"
            exact={true}
            component={() => <Redirect to="/pokemons/" />}
          />
          <Route path="/pokemons/" component={PokemonRouter} />
        </Switch>
      </React.Fragment>
    </Router>
  </Provider>
);

export default App;
