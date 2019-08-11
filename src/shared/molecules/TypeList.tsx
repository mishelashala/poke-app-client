import React from "react";
import { TypeLabel } from "../atoms/TypeLabel";

export interface ITypeListProps {
  data: string[];
}

export const TypeList: React.FunctionComponent<ITypeListProps> = ({
  data = []
}) => (
  <div>
    {data.map(type => (
      <TypeLabel key={type} type={type}>
        {type}
      </TypeLabel>
    ))}
  </div>
);
