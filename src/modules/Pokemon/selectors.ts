import { path } from "lodash/fp";

export const selectIsCached = path(["pokemons", "isCached"]);
export const selectIsLoading = path(["pokemons", "isLoading"]);
export const selectSearch = path(["pokemons", "search"]);
