import { connect } from "react-redux";
import apiGateway from "../../api-gateways/HttpApiGateway";
import { PokemonService } from "../../services/PokemonService";
import { IAppState } from "../../ducks";
import * as pokemons from "../../ducks/pokemons";
import { HomeView } from "./Home";

const pokemonService = PokemonService(apiGateway);

const mapStateToProps = (state: IAppState) => {
  return {
    isLoading: state.pokemons.isLoading,
    isCached: state.pokemons.isCached,
    search: state.pokemons.search
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    fetchPokemons: async () => {
      try {
        dispatch(pokemons.fetchAllStarted());
        const data = await pokemonService.getAll();
        dispatch(pokemons.fetchAllSucceed(data.results));
      } catch (err) {
        dispatch(pokemons.fetchAllFailed(err));
      }
    },

    handleSearchChange: ({ target: { value = "" } }: any) => {
      dispatch(pokemons.searchChanged(value));
    }
  };
};

export const HomeViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
