import React from "react";
import { LoadingCard } from "../../../ui/atoms/LoadingCard";
import { LoadingTitle } from "../../../ui/atoms/LoadingTitle";
import { PokemonDetailsWrapper } from "../atoms/PokemonDetailsWrapper";

export const PokemonDetailsLoading = () => (
  <PokemonDetailsWrapper>
    <LoadingTitle />
    <LoadingCard />
  </PokemonDetailsWrapper>
);
