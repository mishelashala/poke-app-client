import React from "react";
import { LoadingCard, LoadingTitle } from "../../../ui";
import { PokemonDetailsWrapper } from "../atoms/PokemonDetailsWrapper";

export const PokemonDetailsLoading = () => (
  <PokemonDetailsWrapper>
    <LoadingTitle />
    <LoadingCard />
  </PokemonDetailsWrapper>
);
