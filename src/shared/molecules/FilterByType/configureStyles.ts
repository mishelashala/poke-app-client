import * as colors from "../../styles/colors";
import { IFilterByTypeOption } from "./index";

export interface IFilterByTypeConfig {
  data: IFilterByTypeOption;
}

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

export const configureStyles = () => ({
  container: (styles: React.CSSProperties) => {
    return {
      ...styles,
      marginBottom: "0.75rem"
    };
  },
  control: (styles: React.CSSProperties) => {
    return { ...styles, fontFamily: "arial" };
  },
  option: (styles: React.CSSProperties) => {
    return { ...styles, fontFamily: "arial" };
  },
  multiValue: (styles: React.CSSProperties, config: IFilterByTypeConfig) => {
    return {
      ...styles,
      backgroundColor: getTypeLabelBackgroundColor(config.data.value),
      color: "white",
      fontFamily: "arial"
    };
  },
  multiValueLabel: (styles: React.CSSProperties) => {
    return {
      ...styles,
      color: "white",
      fontFamily: "arial"
    };
  }
});
