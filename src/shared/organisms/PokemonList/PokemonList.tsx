import React from "react";
import { Text } from "../../atoms/Text";
import { Retry } from "../../atoms/Retry";
import { PokemonItem } from "../PokemonItem";
import { IPokemon } from "../../models/Pokemon";

interface IPokemonListProps {
  isLoading: boolean;
  data: IPokemon[];
  error: string;
  onClickRetry: () => any;
}

export const PokemonList: React.FunctionComponent<
  IPokemonListProps
> = props => {
  if (props.error) {
    return (
      <div>
        <Text>{props.error}</Text>
        <Retry onClick={props.onClickRetry}>click to try again</Retry>
      </div>
    );
  }

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