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
import { useDispatch, useSelector } from "react-redux";
import apiGateway from "../../gateways/HttpApiGateway";
import * as pokemons from "../../ducks/pokemons";
import { PokemonDetailsService } from "../../services/PokemonDetailsService";
import { IAppState } from "../../ducks";

export interface IPokemonDetailsViewProps {
  match: {
    params: {
      pokemonName: string;
    };
  };
}

export const PokemonDetailsView: React.FC<IPokemonDetailsViewProps> = props => {
  const pokemonName = props.match.params.pokemonName.toLocaleLowerCase();
  const data = useSelector(
    (state: IAppState) => state.pokemons.data[pokemonName] || {}
  );
  const isLoading = useSelector(
    (state: IAppState) =>
      Object.keys(state.pokemons.data).length === 0 ||
      state.pokemons.data[pokemonName]._meta.isLoading
  );
  const isCached = useSelector(
    (state: IAppState) =>
      Object.keys(state.pokemons.data).length !== 0 &&
      state.pokemons.data[pokemonName]._meta.isCached
  );
  const dispatch = useDispatch();
  const pokemonDetailsService = PokemonDetailsService(apiGateway);
  const thunks = pokemons.pokemonDeailsThunks(pokemonDetailsService);

  useEffect(
    () => {
      if (!isCached) {
        dispatch(thunks.fetchPokemonDetailsByName(pokemonName));
      }
    },
    [pokemonName]
  );

  if (isLoading) {
    return <PokemonDetailsLoading />;
  }

  return (
    <PokemonDetailsWrapper>
      <ViewTitle>Pokemon Details</ViewTitle>
      <div style={{ boxSizing: "border-box", textAlign: "center" }}>
        <PokemonCard>
          <img src={data.picture} />
          <PokemonDetails>
            <Name>{data.name}</Name>
            <DetailsText>Height: {data.height}'</DetailsText>
            <DetailsText>Weight: {data.weight}kgs</DetailsText>
          </PokemonDetails>
        </PokemonCard>

        <DetailsViewTitle>Type</DetailsViewTitle>
        <TypeListWrapper>
          <TypeList data={data.types} />
        </TypeListWrapper>

        <DetailsViewTitle>Abilities</DetailsViewTitle>
        <DetailsTypeWrapper>
          {data.abilities.map((ability: string) => {
            return <AbilityLabel key={ability}>{ability}</AbilityLabel>;
          })}
        </DetailsTypeWrapper>

        <DetailsViewTitle>Moves</DetailsViewTitle>
        <DetailsTypeWrapper>
          {data.moves.map((move: string) => {
            return <AbilityLabel key={move}>{move}</AbilityLabel>;
          })}
        </DetailsTypeWrapper>
      </div>
    </PokemonDetailsWrapper>
  );
};
