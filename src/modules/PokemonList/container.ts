import { connect } from "react-redux";
import { PokemonList } from "./PokemonList";

const mapStateToProps = (state: any) => {
  return {
    isLoading: state.pokemons.isLoading,
    data: state.pokemons.data
  };
};

const mapDispatchToProps = () => {
  return {};
};

export const PokemonListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonList);
