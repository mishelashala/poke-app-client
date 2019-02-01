import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import { pokemonReducer } from "./ducks";

export const store = createStore(
  combineReducers({ pokemons: pokemonReducer }),
  applyMiddleware(logger)
);
