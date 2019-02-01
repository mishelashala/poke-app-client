import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import { pokemonReducer } from "./ducks";

export const configureStore = () => {
  const store = createStore(
    combineReducers({ pokemons: pokemonReducer }),
    applyMiddleware(logger)
  );

  return store;
};
