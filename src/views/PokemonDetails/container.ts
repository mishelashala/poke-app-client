import { connect } from "react-redux";
import apiGateway from "../../api-gateways/HttpApiGateway";
import * as pokemons from "../../ducks/pokemons";
import { PokemonDetailsService } from "../../services/PokemonDetailsService";
import { PokemonDetailsView, IPokemonDetailsViewProps } from "./PokemonDetails";

const pokemonDetailsService = PokemonDetailsService(apiGateway);

const mapStateToProps = (state: any, ownProps: IPokemonDetailsViewProps) => {
  const pokemonName = ownProps.match.params.pokemonName.toLowerCase();
  const data = state.pokemons.data[pokemonName] || {};
  const isLoading = Object.keys(data).length === 0 || data._meta.isLoading;
  const isCached = Object.keys(data).length !== 0 && data._meta.isCached;

  return {
    isCached,
    isLoading,
    data,
    pokemonName
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getPokemonDetails: async (name: string) => {
      try {
        dispatch(pokemons.fetchDetailsByNameStarted(name));
        const pokemon = await pokemonDetailsService.getDetailsByName(name);
        console.log("POKEMON:", pokemon);
        dispatch(pokemons.fetchDetailsByNameSucceed(name, pokemon));
      } catch (err) {
        dispatch(pokemons.fetchDetailsByNameFailed(err, name));
      }
    }
  };
};

export const PokemonDetailsViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetailsView);
