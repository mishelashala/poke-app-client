export interface IPokemon {
  id: string;
  name: string;
  types: string[];
  picture: string;
  _meta: {
    isLoading: boolean;
    isCached: boolean;
  };
}
