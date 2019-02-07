import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { pokemonReducer } from "./ducks";

export const configureStore = () => {
  const store = createStore(
    combineReducers({ pokemons: pokemonReducer }),
    applyMiddleware(logger, thunk)
  );

  return store;
};
