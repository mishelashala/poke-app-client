import { Dispatch } from "redux";
import { IFluxStandardAction } from "../shared/models/FluxStandardAction";
import { IPokemon } from "../shared/models/Pokemon";
import { IPokemonDetails } from "../shared/models/PokemonDetails";
import { IPokemonService } from "../shared/services/PokemonService";
import { IPokemonDetailsService } from "../shared/services/PokemonDetailsService";
import { serialize } from "../utils/serialize";
import { assoc, pipe, assocPath } from "lodash/fp";

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

export interface IPokemonThunks {
  fetchAllPokemons: () => (d: Dispatch) => Promise<void>;
}

// pokemonThunks :: IPokemonService -> IPokemonThunks
export const pokemonThunks = (
  pokemonService: IPokemonService
): IPokemonThunks => {
  // fetchAllPokemons :: () -> ReduxThunk
  const fetchAllPokemons = () => async (dispatch: Dispatch) => {
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

export interface IPokemonDetailsThunks {
  fetchPokemonDetailsByName: (pn: string) => (d: Dispatch) => Promise<void>;
}

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
const pokemonReducer = (
  state: IPokemonState = initialState(),
  action: IFluxStandardAction
): IPokemonState => {
  switch (action.type) {
    case FETCH_ALL_POKEMONS_STARTED:
      return assoc("isLoading", true, state);

    case FETCH_ALL_POKEMONS_SUCCEED:
      return pipe(
        assoc("isLoading", false),
        assoc("data", action.payload.pokemons),
        assoc("isCached", true)
      )(state) as IPokemonState;

    case FETCH_ALL_POKEMONS_FAILED:
      return pipe(
        assoc("isLoading", false),
        assoc("error", action.payload)
      )(state) as IPokemonState;

    case SEARCH_CHANGED:
      return assoc("search", action.payload.search, state) as IPokemonState;

    case FILTER_BY_TYPE_CHANGED:
      return assoc("filterByType", action.payload.types, state);

    case FETCH_POKEMON_DETAILS_BY_NAME_START:
      return assocPath(
        ["data", action.payload.name, "_meta", "isLoading"],
        true,
        state
      ) as IPokemonState;

    case FETCH_POKEMON_DETAILS_BY_NAME_SUCCESS:
      return pipe(
        assocPath(["data", action.payload.name], action.payload.data),
        assocPath(["data", action.payload.name, "_meta", "isLoading"], false),
        assocPath(["data", action.payload.name, "_meta", "isCached"], true)
      )(state) as IPokemonState;

    case FETCH_POKEMON_DETAILS_BY_NAME_FAIL:
      return pipe(
        assocPath(["data", action.payload.name, "_meta", "isLoading"], false),
        assocPath(
          ["data", action.payload.name, "_meta", "error"],
          action.payload
        )
      )(state) as IPokemonState;

    default:
      return state;
  }
};

export default pokemonReducer;
