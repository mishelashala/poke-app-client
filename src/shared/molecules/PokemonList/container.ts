import { connect } from "react-redux";
import { PokemonList } from "./PokemonList";
import { getPokemons, getError } from "./selector";
import apiGateway from "../../gateways/HttpApiGateway";
import { PokemonService } from "../../services/PokemonService";
import { pokemonThunks } from "../../../shared/ducks/pokemons";

const pokemonService = PokemonService(apiGateway);
const thunks = pokemonThunks(pokemonService);

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.pokemons.isLoading,
    data: getPokemons(state),
    error: getError(state)
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onClickRetry: async () => {
      dispatch(thunks.fetchAllPokemons());
    }
  };
};

export const PokemonListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList);
