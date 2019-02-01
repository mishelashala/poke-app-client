import { connect } from "react-redux";
import { PokemonList } from "./PokemonList";
import { getPokemons } from "./selector";

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.pokemons.isLoading,
    data: getPokemons(state)
  };
};

const mapDispatchToProps = () => {
  return {};
};

export const PokemonListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList);
