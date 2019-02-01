import React from "react";
import Select from "react-select";
import { configureStyles, IFilterByTypeOption } from "./configureStyles";

const options: IFilterByTypeOption[] = [
  { value: "fire", label: "Fire" },
  { value: "poison", label: "Poison" },
  { value: "water", label: "Water" }
];

// FilterByType :: () -> React.FunctionComponent
export const FilterByType = () => (
  <Select
    isMulti
    name="types"
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
    placeholder="Filter by Pokemon Type"
    styles={configureStyles()}
  />
);
