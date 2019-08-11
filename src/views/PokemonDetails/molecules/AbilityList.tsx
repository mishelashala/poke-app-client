import * as React from "react";
import { DetailsViewTitle } from "../atoms/DetailsViewTitle";
import { DetailsTypeWrapper } from "../atoms/DetailsWrapper";
import { Tag } from "../atoms/Tag";

export interface IAbilityListProps {
  data: string[];
}

export const AbilityList: React.SFC<IAbilityListProps> = ({ data }) => {
  if (!data.length) {
    return <React.Fragment />;
  }

  return (
    <React.Fragment>
      <DetailsViewTitle>Abilities</DetailsViewTitle>
      <DetailsTypeWrapper>
        {data.map((move: string) => {
          return <Tag key={move}>{move}</Tag>;
        })}
      </DetailsTypeWrapper>
    </React.Fragment>
  );
};
