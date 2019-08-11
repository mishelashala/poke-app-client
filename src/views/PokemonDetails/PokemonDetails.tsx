import React, { useEffect } from "react";
import { PokemonCard, PokemonDetails, ViewTitle } from "../../ui";
import { TypeList } from "../../modules/TypeList";
import { DetailsText } from "./atoms/DetailsText";
import { PokemonDetailsLoading } from "./molecules/PokemonDetailsLoading";
import { useDispatch, useSelector } from "react-redux";
import { IPokemonDetailsThunks } from "../../ducks/pokemons";
import { IPokemonDetails } from "../../models";
import * as selectors from "./selectors";
import { path, defaultTo } from "lodash/fp";
import { DetailsTypeWrapper } from "./atoms/DetailsWrapper";
import { PokemonName } from "./atoms/PokemonName";
import { PokemonDetailsWrapper } from "./atoms/PokemonDetailsWrapper";
import { DetailsViewTitle } from "./atoms/DetailsViewTitle";
import { TypeListWrapper } from "./atoms/TypeListWrapper";
import { AbilityLabel } from "./atoms/AbilityLabel";

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
              <PokemonName>{data.name}</PokemonName>
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
            {defaultTo([] as string[], path("abilities", data)).map(
              (ability: string) => {
                return <AbilityLabel key={ability}>{ability}</AbilityLabel>;
              }
            )}
          </DetailsTypeWrapper>

          <DetailsViewTitle>Moves</DetailsViewTitle>
          <DetailsTypeWrapper>
            {defaultTo([] as string[], path("moves", data)).map(
              (move: string) => {
                return <AbilityLabel key={move}>{move}</AbilityLabel>;
              }
            )}
          </DetailsTypeWrapper>
        </div>
      </PokemonDetailsWrapper>
    );
  };

  return PokemonDetailsView;
};
