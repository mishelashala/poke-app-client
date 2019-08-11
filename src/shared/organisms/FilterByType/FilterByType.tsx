import React, { CSSProperties } from "react";
import Select from "react-select";
import { configureStyles } from "./configureStyles";
import { IFilterByTypeOption } from "./index";

const options: IFilterByTypeOption[] = [
  { value: "fire", label: "Fire" },
  { value: "poison", label: "Poison" },
  { value: "water", label: "Water" }
];

interface IFilterByTypeProps {
  handleChange: (a: any) => void;
}

// FilterByType :: () -> React.FunctionComponent
export const FilterByType: React.FunctionComponent<
  IFilterByTypeProps
> = props => (
  <Select
    isMulti
    name="types"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
    placeholder="Filter by Pokemon Type"
    styles={configureStyles()}
    onChange={props.handleChange}
  />
);
