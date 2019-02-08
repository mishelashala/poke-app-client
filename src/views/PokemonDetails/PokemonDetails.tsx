import React, { useEffect } from "react";
import { IPokemonDetails } from "../../models/";
import { PokemonCard, PokemonDetails, ViewTitle } from "../../ui";
import { TypeList } from "../../modules/TypeList";
import {
  PokemonDetailsWrapper,
  DetailsViewTitle,
  TypeListWrapper,
  AbilityLabel,
  DetailsText,
  Name,
  DetailsTypeWrapper
} from "./ui";
import { PokemonDetailsLoading } from "./PokemonDetailsLoading";

export interface IPokemonDetailsViewProps {
  match: {
    params: {
      pokemonName: string;
    };
  };
  data: IPokemonDetails;
  pokemonName: string;
  getPokemonDetails: any;
  isLoading: boolean;
  isCached: boolean;
}

export const PokemonDetailsView: React.FC<IPokemonDetailsViewProps> = props => {
  useEffect(() => {
    if (!props.isCached) {
      props.getPokemonDetails(props.pokemonName);
    }
  });

  if (props.isLoading) {
    return <PokemonDetailsLoading />;
  }

  return (
    <PokemonDetailsWrapper>
      <ViewTitle>Pokemon Details</ViewTitle>
      <div style={{ boxSizing: "border-box", textAlign: "center" }}>
        <PokemonCard>
          <img src={props.data.picture} />
          <PokemonDetails>
            <Name>{props.data.name}</Name>
            <DetailsText>Height: {props.data.height}'</DetailsText>
            <DetailsText>Weight: {props.data.weight}kgs</DetailsText>
          </PokemonDetails>
        </PokemonCard>

        <DetailsViewTitle>Type</DetailsViewTitle>
        <TypeListWrapper>
          <TypeList data={props.data.types} />
        </TypeListWrapper>

        <DetailsViewTitle>Abilities</DetailsViewTitle>
        <DetailsTypeWrapper>
          {props.data.abilities.map((ability: string) => {
            return <AbilityLabel key={ability}>{ability}</AbilityLabel>;
          })}
        </DetailsTypeWrapper>

        <DetailsViewTitle>Moves</DetailsViewTitle>
        <DetailsTypeWrapper>
          {props.data.moves.map((move: string) => {
            return <AbilityLabel key={move}>{move}</AbilityLabel>;
          })}
        </DetailsTypeWrapper>
      </div>
    </PokemonDetailsWrapper>
  );
};
