import React from "react";
import { LoadingCard, LoadingTitle } from "../../ui";
import { PokemonDetailsWrapper } from "./ui";

export const PokemonDetailsLoading = () => (
  <PokemonDetailsWrapper>
    <LoadingTitle />
    <LoadingCard />
  </PokemonDetailsWrapper>
);
