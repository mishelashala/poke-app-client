import { IPokemon } from "../models/";
import { createReducer } from "./createReducer";

// ACTIONS
export const FETCH_ALL_POKEMONS_STARTED =
  "pokedex/POKEMONS/FETCH_ALL_POKEMONS_STARTED";
export const FETCH_ALL_POKEMONS_SUCCEED =
  "pokedex/POKEMONS/FETCH_ALL_POKEMONS_SUCCEED";
export const FETCH_ALL_POKEMONS_FAILED =
  "pokedex/POKEMONS/FETCH_ALL_POKEMONS_FAILED";

// ACTION CREATORS

// fetchAllStarted :: () -> IFluxStandardAction
export const fetchAllStarted = () => {
  return {
    type: FETCH_ALL_POKEMONS_STARTED
  };
};

// fetchAllFailed :: Error -> IFluxStandardAction
export const fetchAllFailed = (error: Error) => {
  return {
    type: FETCH_ALL_POKEMONS_STARTED,
    error: true,
    payload: error
  };
};

// fetchAllSucceed :: IPokemon[] -> IFluxStandardAction
export const fetchAllSucceed = (pokemons: IPokemon[]) => {
  return {
    type: FETCH_ALL_POKEMONS_SUCCEED,
    payload: {
      pokemons
    }
  };
};

// REDUCER
export interface IPokemonState {
  isLoading: boolean;
  error?: Error;
  data: any;
}

const initialState = {
  data: {},
  error: undefined,
  isLoading: true
};

// pokemonReducer :: (IPokemonState, IReduxAction) => IPokemonState
const pokemonReducer = createReducer<IPokemonState>(initialState, {
  [FETCH_ALL_POKEMONS_STARTED]: state => {
    return { ...state, isLoading: true };
  },
  [FETCH_ALL_POKEMONS_SUCCEED]: (state: any, action: any) => {
    console.log("ACTION:", action);
    return {
      ...state,
      isLoading: false,
      data: action.payload.pokemons
    };
  },
  [FETCH_ALL_POKEMONS_FAILED]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  }
});

export default pokemonReducer;
