import * as React from "react";
import { DetailsViewTitle } from "../atoms/DetailsViewTitle";
import { DetailsTypeWrapper } from "../atoms/DetailsWrapper";
import { Tag } from "../atoms/Tag";

export interface IMovementListProps {
  data: string[];
}

export const MovementList: React.SFC<IMovementListProps> = ({ data }) => {
  if (!data.length) {
    return <React.Fragment />;
  }

  return (
    <React.Fragment>
      <DetailsViewTitle>Moves</DetailsViewTitle>
      <DetailsTypeWrapper>
        {data.map((move: string) => {
          return <Tag key={move}>{move}</Tag>;
        })}
      </DetailsTypeWrapper>
    </React.Fragment>
  );
};
