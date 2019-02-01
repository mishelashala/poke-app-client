import { connect } from "react-redux";
import apiGateway from "../../api-gateways/LocalApiGateway";
import { PokemonService } from "../../services/PokemonService";
import { IAppState } from "../../ducks";
import * as pokemons from "../../ducks/pokemons";
import { HomeView } from "./Home";

const pokemonService = PokemonService(apiGateway);

const mapStateToProps = (state: IAppState) => {
  return {
    isLoading: state.pokemons.isLoading,
    isCached: state.pokemons.isCached
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
    }
  };
};

export const HomeViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
