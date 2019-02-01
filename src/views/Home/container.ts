import { connect } from "react-redux";
import apiGateway from "../../api-gateways/LocalApiGateway";
import { PokemonService } from "../../services/PokemonService";
import {
  FETCH_ALL_POKEMONS_FAILED,
  FETCH_ALL_POKEMONS_STARTED,
  FETCH_ALL_POKEMONS_SUCCEED
} from "../../ducks/pokemons";
import { HomeView } from "./Home";

const pokemonService = PokemonService(apiGateway);

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    fetchPokemons: async () => {
      try {
        dispatch({
          type: FETCH_ALL_POKEMONS_STARTED
        });
        const data = await pokemonService.getAll();
        dispatch({
          type: FETCH_ALL_POKEMONS_SUCCEED,
          payload: {
            pokemons: data.results
          }
        });
      } catch (err) {
        dispatch({
          type: FETCH_ALL_POKEMONS_FAILED,
          error: true,
          payload: err
        });
      }
    }
  };
};

export const HomeViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
