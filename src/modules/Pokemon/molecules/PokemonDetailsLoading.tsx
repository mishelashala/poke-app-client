import React from "react";
import { LoadingCard } from "../../../shared/atoms/LoadingCard";
import { LoadingTitle } from "../../../shared/atoms/LoadingTitle";
import { PokemonDetailsWrapper } from "../atoms/PokemonDetailsWrapper";

export const PokemonDetailsLoading = () => (
  <PokemonDetailsWrapper>
    <LoadingTitle />
    <LoadingCard />
  </PokemonDetailsWrapper>
);
