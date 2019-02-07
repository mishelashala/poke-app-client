import { connect } from "react-redux";
import { PokemonList } from "./PokemonList";
import { getPokemons, getError } from "./selector";
import apiGateway from "../../api-gateways/HttpApiGateway";
import { PokemonService } from "../../services/PokemonService";
import * as pokemons from "../../ducks/pokemons";
import { IPokemon } from "../../models";

const pokemonService = PokemonService(apiGateway);

const serialize = <T>(key: string, arr: T[]): any => {
  return arr.reduce((json: any, item: any) => {
    const formatedKey = item[key].toLowerCase();
    json[formatedKey] = item;
    return json;
  }, {});
};

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
      try {
        dispatch(pokemons.fetchAllStarted());
        const data = await pokemonService.getAll();
        dispatch(
          pokemons.fetchAllSucceed(serialize<IPokemon>("name", data.results))
        );
      } catch (err) {
        dispatch(pokemons.fetchAllFailed(err));
      }
    }
  };
};

export const PokemonListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList);
