import React from "react";
import styled from "styled-components";
import { Text, colors } from "../../ui/";

// getTypeLabelBackgroundColor :: String -> String
const getTypeLabelBackgroundColor = (type: string = ""): string => {
  switch (type) {
    case "poison":
      return colors.LABEL_PURPLE;
    case "grass":
      return colors.LABEL_GREEN;
    case "fire":
      return colors.LABEL_ORANGE;
    case "water":
      return colors.LABEL_BLUE;
    default:
      return colors.LABEL_GRAY;
  }
};

interface ITypeLabelProps {
  type: string;
}

export const TypeLabel = styled(Text)<ITypeLabelProps>`
  background-color: ${props => getTypeLabelBackgroundColor(props.type)};
  box-sizing: border-box;
  color: white;
  display: inline-block;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem;
  margin-right: 0.5rem;
`;

export const TypeListContent = styled.div`
  text-align: left;
`;

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
