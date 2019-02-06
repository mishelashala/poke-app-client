import React from "react";
import { Text } from "../../ui";
import { PokemonItem } from "./PokemonItem";
import { IPokemon } from "../../models/";

interface IPokemonListProps {
  data: IPokemon[];
}

export const PokemonList: React.FunctionComponent<
  IPokemonListProps
> = props => {
  if (!props.data.length) {
    return <Text>There are no pokemons to show :'(</Text>;
  }

  return (
    <section style={{ textAlign: "center" }}>
      {props.data.map((pokemon: IPokemon) => (
        <PokemonItem
          key={pokemon.name}
          name={pokemon.name}
          picture={pokemon.picture}
          type={pokemon.types}
          isLoading={pokemon._meta.isLoading}
          isCached={pokemon._meta.isCached}
        />
      ))}
    </section>
  );
};
