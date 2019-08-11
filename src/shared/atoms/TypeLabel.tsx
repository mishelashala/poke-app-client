import styled from "styled-components";
import { Text } from "../atoms/Text";
import * as colors from "../styles/colors";

export enum PokemonType {
  POISON = "poison",
  GRASS = "grass",
  FIRE = "fire",
  WATER = "water"
}

// getTypeLabelBackgroundColor :: String -> String
const getTypeLabelBackgroundColor = (type: string = ""): string => {
  switch (type) {
    case PokemonType.POISON:
      return colors.LABEL_PURPLE;
    case PokemonType.GRASS:
      return colors.LABEL_GREEN;
    case PokemonType.FIRE:
      return colors.LABEL_ORANGE;
    case PokemonType.WATER:
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
