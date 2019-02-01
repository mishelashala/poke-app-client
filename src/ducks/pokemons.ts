import { IPokemon } from "../models/";
import { createReducer } from "./createReducer";

// ACTIONS
export const FETCH_ALL_POKEMONS_STARTED =
  "pokedex/POKEMONS/FETCH_ALL_POKEMONS_STARTED";
export const FETCH_ALL_POKEMONS_SUCCEED =
  "pokedex/POKEMONS/FETCH_ALL_POKEMONS_SUCCEED";
export const FETCH_ALL_POKEMONS_FAILED =
  "pokedex/POKEMONS/FETCH_ALL_POKEMONS_FAILED";

export const SEARCH_CHANGED = "pokedex/POKEMONS/SEARCH_CHANGED";

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

// searchChanged :: String -> IFluxStandardAction
export const searchChanged = (search = "") => {
  return {
    type: SEARCH_CHANGED,
    payload: {
      search
    }
  };
};

// REDUCER
export interface IPokemonState {
  isLoading: boolean;
  error?: Error;
  data: any;
  isCached: boolean;
  search: string;
}

export const initialState = (): IPokemonState => ({
  data: {},
  error: undefined,
  isLoading: true,
  isCached: false,
  search: ""
});

// pokemonReducer :: (IPokemonState, IReduxAction) => IPokemonState
const pokemonReducer = createReducer<IPokemonState>(initialState(), {
  [FETCH_ALL_POKEMONS_STARTED]: state => {
    return { ...state, isLoading: true };
  },
  [FETCH_ALL_POKEMONS_SUCCEED]: (state: any, action: any) => {
    return {
      ...state,
      isLoading: false,
      data: action.payload.pokemons,
      isCached: true
    };
  },
  [FETCH_ALL_POKEMONS_FAILED]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.payload
    };
  },
  [SEARCH_CHANGED]: (state, action) => {
    return {
      ...state,
      search: action.payload.search
    };
  }
});

export default pokemonReducer;
