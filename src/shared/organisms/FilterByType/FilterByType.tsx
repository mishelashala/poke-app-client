import React from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { configureStyles } from "./configureStyles";
import { IFilterByTypeOption } from "./index";
import { filterByTypeChanged } from "../../../shared/ducks/pokemons";
import { map, prop } from "lodash/fp";
import { ValueType } from "react-select/lib/types";

const options: IFilterByTypeOption[] = [
  { value: "fire", label: "Fire" },
  { value: "poison", label: "Poison" },
  { value: "water", label: "Water" }
];

// FilterByType :: () -> React.FunctionComponent
export const FilterByType: React.SFC = () => {
  const dispatch = useDispatch();

  const handleChange = (types: ValueType<IFilterByTypeOption>) => {
    const filterValues = map(prop("value"), types);
    dispatch(filterByTypeChanged(filterValues));
  };

  return (
    <Select
      isMulti
      name="types"
      options={options}
      className="basic-multi-select"
      classNamePrefix="select"
      placeholder="Filter by Pokemon Type"
      styles={configureStyles()}
      onChange={handleChange}
    />
  );
};
