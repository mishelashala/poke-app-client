import * as colors from "../../styles/colors";
import { IFilterByTypeOption } from "./index";
import { assoc, pipe } from "lodash/fp";
import { PokemonType } from "../../models/PokemonType";

export interface IFilterByTypeConfig {
  data: IFilterByTypeOption;
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

export const configureStyles = () => ({
  container: (styles: React.CSSProperties) =>
    assoc("marginBottom", "0.75rem", styles) as React.CSSProperties,

  control: (styles: React.CSSProperties) =>
    assoc("fontFamily", "arial", styles) as React.CSSProperties,

  option: (styles: React.CSSProperties) =>
    assoc("fontFamily", "arial", styles) as React.CSSProperties,

  multiValue: (styles: React.CSSProperties, config: IFilterByTypeConfig) => {
    return pipe(
      assoc("backgroundColor", getTypeLabelBackgroundColor(config.data.value)),
      assoc("color", "white"),
      assoc("fontFamily", "arial")
    )(styles) as React.CSSProperties;
  },

  multiValueLabel: (styles: React.CSSProperties) =>
    pipe(
      assoc("color", "white"),
      assoc("fontFamily", "arial")
    )(styles) as React.CSSProperties
});
