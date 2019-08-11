import React, { useEffect } from "react";
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
import { IPokemonDetailsThunks } from "../../ducks/pokemons";
import { IPokemonDetails } from "../../models";
import * as selectors from "./selectors";

export interface IPokemonDetailsViewProps {
  match: {
    params: {
      pokemonName: string;
    };
  };
}

export const PokemonDetailsViewFactory = (
  pokemonDetailsThunks: IPokemonDetailsThunks
) => {
  const PokemonDetailsView: React.FC<IPokemonDetailsViewProps> = props => {
    const pokemonName = props.match.params.pokemonName.toLocaleLowerCase();
    const data = useSelector(
      selectors.selectPokemon(pokemonName)
    ) as IPokemonDetails;
    const isLoading = useSelector(
      selectors.selectIsLoadingPokemon(pokemonName)
    );
    const isCached = useSelector(selectors.selectIsCachedPokemon(pokemonName));
    const dispatch = useDispatch();

    useEffect(
      () => {
        if (!isCached) {
          dispatch(pokemonDetailsThunks.fetchPokemonDetailsByName(pokemonName));
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

  return PokemonDetailsView;
};
