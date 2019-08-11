import React from "react";
import { LoadingCard } from "../../../ui/atoms/LoadingCard";
import { LoadingTitle } from "../../../ui/atoms/LoadingTitle";
import { Wrapper } from "../../../ui/atoms/Wrapper";

export const HomeViewLoading = () => (
  <Wrapper>
    <LoadingTitle />
    <LoadingCard />
    <LoadingCard />
    <LoadingCard />
  </Wrapper>
);
