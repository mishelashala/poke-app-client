import { connect } from "react-redux";
import apiGateway from "../../api-gateways/HttpApiGateway";
import * as pokemons from "../../ducks/pokemons";
import { PokemonDetailsService } from "../../services/PokemonDetailsService";
import { PokemonDetailsView, IPokemonDetailsViewProps } from "./PokemonDetails";
import { getPokemonName, getData, isLoading, isCached } from "./selector";

const pokemonDetailsService = PokemonDetailsService(apiGateway);
const thunks = pokemons.pokemonDeailsThunks(pokemonDetailsService);

const mapStateToProps = (state: any, ownProps: IPokemonDetailsViewProps) => {
  const pokemonName = getPokemonName(ownProps);
  const data = getData(state, pokemonName);
  const loading = isLoading(state, pokemonName);
  const cached = isCached(state, pokemonName);

  return {
    isCached: cached,
    isLoading: loading,
    data,
    pokemonName
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    getPokemonDetails: async (name: string) => {
      dispatch(thunks.fetchPokemonDetailsByName(name));
    }
  };
};

export const PokemonDetailsViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetailsView);
