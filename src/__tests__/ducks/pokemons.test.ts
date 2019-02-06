import pokemonReducer, {
  initialState,
  fetchAllStarted,
  fetchAllSucceed,
  fetchAllFailed,
  fetchDetailsByNameStarted,
  fetchDetailsByNameSucceed,
  fetchDetailsByNameFailed,
  searchChanged,
  filterByTypeChanged
} from "../../ducks/pokemons";
import { IPokemon, IPokemonDetails } from "../../models";

const pokemon = (): IPokemon => ({
  id: "1",
  name: "Bulbasaur",
  types: ["fire"],
  picture: "",
  _meta: {
    isLoading: false,
    isCached: true
  }
});

const pokemonDetails = (): IPokemonDetails => ({
  ...pokemon(),
  abilities: ["one"],
  height: 1,
  weight: 1,
  moves: ["left"]
});

describe("Pokemons Ducks", () => {
  test("#fetchAllStarted", () => {
    const action = fetchAllStarted();
    const result = pokemonReducer(initialState(), action);
    const expected = {
      ...initialState(),
      isLoading: true
    };

    expect(result).toEqual(expected);
  });

  test("#fetchAllSucceed", () => {
    const pokemons = [pokemon()];
    const action = fetchAllSucceed(pokemons);
    const result = pokemonReducer(initialState(), action);
    const expected = {
      ...initialState(),
      data: pokemons,
      isCached: true
    };

    expect(result).toEqual(expected);
  });

  test("#fetchAllFailed", () => {
    const error = new Error("Error Loading Pokimons :,(");
    const action = fetchAllFailed(error);
    const result = pokemonReducer(initialState(), action);
    const expected = {
      ...initialState(),
      isLoading: false,
      error
    };

    expect(result).toEqual(expected);
  });

  test("#fetchDetailsByNameStarted", () => {
    const name = "bulbasaur";
    const action = fetchDetailsByNameStarted(name);
    const result = pokemonReducer(initialState(), action);
    const expected = {
      ...initialState(),
      data: {
        [name]: {
          _meta: {
            isLoading: true
          }
        }
      }
    };

    expect(result).toEqual(expected);
  });

  test("#fetchDetailsByNameSucceed", () => {
    const name = "bulbasaur";
    const data = pokemonDetails();
    const action = fetchDetailsByNameSucceed(name, data);
    const result = pokemonReducer(initialState(), action);
    const expected = {
      ...initialState(),
      data: {
        [name]: {
          ...data,
          _meta: {
            isLoading: false,
            isCached: true
          }
        }
      }
    };

    expect(result).toEqual(expected);
  });

  test("#fetchDetailsByNameFailed", () => {
    const error = new Error("Error loading bulbasaur");
    const name = "bulbasaur";
    const action = fetchDetailsByNameFailed(error, name);
    const result = pokemonReducer(initialState(), action);
    const expected = {
      ...initialState(),
      data: {
        [name]: {
          _meta: {
            isLoading: false,
            error
          }
        }
      }
    };

    expect(result).toEqual(expected);
  });

  test("#searchChanged", () => {
    const search = "bulbasaur";
    const action = searchChanged(search);
    const result = pokemonReducer(initialState(), action);
    const expected = {
      ...initialState(),
      search
    };

    expect(result).toEqual(expected);
  });

  test("#filterByTypeChanged", () => {
    const filterByType = ["fire"];
    const action = filterByTypeChanged(filterByType);
    const result = pokemonReducer(initialState(), action);
    const expected = {
      ...initialState(),
      filterByType
    };

    expect(result).toEqual(expected);
  });
});
