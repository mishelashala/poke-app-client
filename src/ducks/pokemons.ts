import { IFluxStandardAction, IPokemon, IPokemonDetails } from "../models/";
import { IPokemonService } from "../services/PokemonService";
import { IPokemonDetailsService } from "../services/PokemonDetailsService";
import { serialize } from "../utils/serialize";
import { createReducer } from "./createReducer";

// ACTIONS
export const FETCH_ALL_POKEMONS_STARTED =
  "pokedex/POKEMONS/FETCH_ALL_POKEMONS_STARTED";
export const FETCH_ALL_POKEMONS_SUCCEED =
  "pokedex/POKEMONS/FETCH_ALL_POKEMONS_SUCCEED";
export const FETCH_ALL_POKEMONS_FAILED =
  "pokedex/POKEMONS/FETCH_ALL_POKEMONS_FAILED";

export const SEARCH_CHANGED = "pokedex/POKEMONS/SEARCH_CHANGED";

export const FILTER_BY_TYPE_CHANGED = "pokedex/POKEMONS/FILTER_BY_TYPE_CHANGED";

export const FETCH_POKEMON_DETAILS_BY_NAME_START =
  "pokedex/POKEMONS/FETCH_POKEMON_DETAILS_BY_NAME_START";
export const FETCH_POKEMON_DETAILS_BY_NAME_SUCCESS =
  "pokedex/POKEMONS/FETCH_POKEMON_DETAILS_BY_NAME_SUCCESS";
export const FETCH_POKEMON_DETAILS_BY_NAME_FAIL =
  "pokedex/POKEMONS/FETCH_POKEMON_DETAILS_BY_NAME_FAIL";

// ACTION CREATORS

// fetchAllStarted :: () -> IFluxStandardAction
export const fetchAllStarted = (): IFluxStandardAction => {
  return {
    type: FETCH_ALL_POKEMONS_STARTED
  };
};

// fetchAllFailed :: Error -> IFluxStandardAction
export const fetchAllFailed = (error: Error) => {
  return {
    type: FETCH_ALL_POKEMONS_FAILED,
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

// fetchDetailsByNameStarted :: String -> IFluxStandardAction
export const fetchDetailsByNameStarted = (name: string) => ({
  type: FETCH_POKEMON_DETAILS_BY_NAME_START,
  payload: {
    name
  }
});

// fetchDetailsByNameSucceed :: IPokemonDetails -> IFluxStandardAction
export const fetchDetailsByNameSucceed = (
  name: string,
  data: IPokemonDetails
) => ({
  type: FETCH_POKEMON_DETAILS_BY_NAME_SUCCESS,
  payload: {
    name,
    data
  }
});

// fetchDetailsByNameFailed :: Error -> IFluxStandardAction
export const fetchDetailsByNameFailed = (error: Error, name: string) => ({
  type: FETCH_POKEMON_DETAILS_BY_NAME_FAIL,
  payload: error,
  error: true,
  name
});

// searchChanged :: String -> IFluxStandardAction
export const searchChanged = (search = "") => {
  return {
    type: SEARCH_CHANGED,
    payload: {
      search
    }
  };
};

// filterByTypeChanged :: String[] -> IFluxStandardAction
export const filterByTypeChanged = (types: string[]) => ({
  type: FILTER_BY_TYPE_CHANGED,
  payload: {
    types
  }
});

// THUNKS

// pokemonThunks :: IPokemonService -> IPokemonThunks
export const pokemonThunks = (pokemonService: IPokemonService) => {
  // fetchAllPokemons :: () -> ReduxThunk
  const fetchAllPokemons = () => async (dispatch: Function) => {
    try {
      dispatch(fetchAllStarted());
      const data = await pokemonService.getAll();
      dispatch(fetchAllSucceed(serialize<IPokemon>("name", data.results)));
    } catch (err) {
      dispatch(fetchAllFailed(err));
    }
  };

  return { fetchAllPokemons };
};

// pokemonDeailsThunks :: IPokemonDetailsService
export const pokemonDeailsThunks = (
  pokemonDetailsService: IPokemonDetailsService
) => {
  // fetchPokemonDetailsByName :: String -> ReduxThunk
  const fetchPokemonDetailsByName = (name: string) => async (
    dispatch: Function
  ) => {
    try {
      dispatch(fetchDetailsByNameStarted(name));
      const pokemon = await pokemonDetailsService.getDetailsByName(name);
      dispatch(fetchDetailsByNameSucceed(name, pokemon));
    } catch (err) {
      dispatch(fetchDetailsByNameFailed(err, name));
    }
  };

  return { fetchPokemonDetailsByName };
};

// REDUCER
export interface IPokemonState {
  isLoading: boolean;
  error?: Error;
  data: any;
  isCached: boolean;
  search: string;
  filterByType: string[];
}

export const initialState = (): IPokemonState => ({
  data: {},
  error: undefined,
  isLoading: false,
  isCached: false,
  search: "",
  filterByType: []
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
  },
  [FILTER_BY_TYPE_CHANGED]: (state, action) => {
    return {
      ...state,
      filterByType: action.payload.types
    };
  },
  [FETCH_POKEMON_DETAILS_BY_NAME_START]: (state: any, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        [action.payload.name]: {
          ...state.data[action.payload.name],
          _meta: {
            isLoading: true
          }
        }
      }
    };
  },
  [FETCH_POKEMON_DETAILS_BY_NAME_SUCCESS]: (state: any, action) => {
    return {
      ...state,
      data: {
        ...state.data,
        [action.payload.name]: {
          ...state.data[action.payload.name],
          ...action.payload.data,
          _meta: {
            isLoading: false,
            isCached: true
          }
        }
      }
    };
  },
  [FETCH_POKEMON_DETAILS_BY_NAME_FAIL]: (state: any, action: any) => {
    return {
      ...state,
      data: {
        ...state.data,
        [action.name]: {
          ...state.data[action.name],

          _meta: {
            isLoading: false,
            error: action.payload
          }
        }
      }
    };
  }
});

export default pokemonReducer;
