import React from "react";
import { useSelector } from "react-redux";
import { Text } from "../../atoms/Text";
import { PokemonItem } from "../PokemonItem";
import { IPokemon } from "../../models/Pokemon";
import * as pokemonSelector from "./selector";

export const PokemonList: React.SFC = () => {
  const data = useSelector(pokemonSelector.getPokemons);
  const error = useSelector(pokemonSelector.getError);

  if (error) {
    return <Text>We couldn't load the pokemon list, try later :(</Text>;
  }

  if (!data.length) {
    return <Text>There are no pokemons to show :'(</Text>;
  }

  return (
    <React.Fragment>
      {data.map((pokemon: IPokemon) => (
        <PokemonItem
          key={pokemon.name}
          name={pokemon.name}
          picture={pokemon.picture}
          type={pokemon.types}
          isLoading={pokemon._meta.isLoading}
          isCached={pokemon._meta.isCached}
        />
      ))}
    </React.Fragment>
  );
};
