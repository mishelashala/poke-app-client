import React from "react";
import { LoadingCard } from "../../../shared/atoms/LoadingCard";
import { LoadingTitle } from "../../../shared/atoms/LoadingTitle";
import { Wrapper } from "../../../shared/atoms/Wrapper";

export const HomeViewLoading = () => (
  <Wrapper>
    <LoadingTitle />
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
  </Wrapper>
);
