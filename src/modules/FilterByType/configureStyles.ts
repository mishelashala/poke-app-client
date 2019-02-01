import { colors } from "../../ui/";

export interface IFilterByTypeConfig {
  data: IFilterByTypeOption;
}

export interface IFilterByTypeOption {
  value: string;
  label: string;
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
  container: (styles: any) => {
    return {
      ...styles,
      marginBottom: "0.75rem"
    };
  },
  control: (styles: any) => {
    return { ...styles, fontFamily: "arial" };
  },
  option: (styles: any) => {
    return { ...styles, fontFamily: "arial" };
  },
  multiValue: (styles: any, config: IFilterByTypeConfig) => {
    return {
      ...styles,
      backgroundColor: getTypeLabelBackgroundColor(config.data.value),
      color: "white",
      fontFamily: "arial"
    };
  },
  multiValueLabel: (styles: any) => {
    return {
      ...styles,
      color: "white",
      fontFamily: "arial"
    };
  }
});
