import { connect } from "react-redux";
import apiGateway from "../../../gateways/HttpApiGateway";
import { PokemonDetailsService } from "../../../services/PokemonDetailsService";
import { PokemonItem } from "./PokemonItem";

const pokemonDetailsService = PokemonDetailsService(apiGateway);

const mapDispatchToProps = (dispatch: Function) => ({
  fetchPokemon: async (name: string) => {
    try {
      dispatch({
        type: "pokedex/POKEMONS/FETCH_POKEMON_DETAILS_BY_NAME_START",
        payload: {
          name: name.toLowerCase()
        }
      });

      const data = await pokemonDetailsService.getDetailsByName(name);

      dispatch({
        type: "pokedex/POKEMONS/FETCH_POKEMON_DETAILS_BY_NAME_SUCCESS",
        payload: {
          name,
          data
        }
      });
    } catch (err) {
      dispatch({
        type: "pokedex/POKEMONS/FETCH_POKEMON_DETAILS_BY_NAME_FAIL",
        error: err,
        name
      });
    }
  }
});

export const PokemonItemContainer = connect(
  undefined,
  mapDispatchToProps
)(PokemonItem);
