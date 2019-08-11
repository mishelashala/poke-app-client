import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Text } from "../../../shared/atoms/Text";
import { PokemonCard } from "../../../shared/atoms/PokemonCard";
import { PokemonDetails } from "../../../shared/atoms/PokemonDetails";
import { LoadingImage } from "../../../shared/atoms/LoadingImage";
import { TypeList } from "../TypeList";
import { PokemonItemTypes } from "./PokemonItemTypes";
import { PokemonItemImage } from "./PokemonItemImage";

interface IPokemonItemProps {
  isLoading: boolean;
  name: string;
  picture: string;
  type: string[];
  fetchPokemon: (n: string) => void;
  isCached: boolean;
}

export const PokemonItem: React.FC<IPokemonItemProps> = props => {
  useEffect(() => {
    if (!props.isCached) {
      props.fetchPokemon(props.name.toLowerCase());
    }
  });

  return (
    <Link to={`/pokemons/${props.name}`}>
      <PokemonCard>
        {props.isLoading && <LoadingImage />}

        {!props.isLoading && <PokemonItemImage src={props.picture} />}

        <PokemonDetails>
          <Text>{props.name}</Text>
          <PokemonItemTypes>
            <TypeList data={props.type} />
          </PokemonItemTypes>
        </PokemonDetails>
      </PokemonCard>
    </Link>
  );
};
