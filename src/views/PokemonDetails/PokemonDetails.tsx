import React, { useEffect } from "react";
import { PokemonCard } from "../../shared/atoms/PokemonCard";
import { PokemonDetails } from "../../shared/atoms/PokemonDetails";
import { ViewTitle } from "../../shared/atoms/ViewTitle";
import { TypeList } from "../../shared/molecules/TypeList";
import { DetailsText } from "./atoms/DetailsText";
import { PokemonDetailsLoading } from "./molecules/PokemonDetailsLoading";
import { useDispatch, useSelector } from "react-redux";
import { IPokemonDetailsThunks } from "../../ducks/pokemons";
import { IPokemonDetails } from "../../shared/models/PokemonDetails";
import * as selectors from "./selectors";
import { path, defaultTo } from "lodash/fp";
import { PokemonName } from "./atoms/PokemonName";
import { PokemonDetailsWrapper } from "./atoms/PokemonDetailsWrapper";
import { DetailsViewTitle } from "./atoms/DetailsViewTitle";
import { TypeListWrapper } from "./atoms/TypeListWrapper";
import { AbilityList } from "./molecules/AbilityList";
import { MovementList } from "./molecules/MovementList";

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

        <AbilityList
          data={defaultTo([] as string[], path("abilities", data))}
        />

        <MovementList data={defaultTo([] as string[], path("moves", data))} />
      </PokemonDetailsWrapper>
    );
  };

  return PokemonDetailsView;
};
