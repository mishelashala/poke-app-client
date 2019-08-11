import { connect } from "react-redux";
import fp from "lodash/fp";
import { filterByTypeChanged } from "../../../shared/ducks/pokemons";
import { IFilterByTypeOption } from "./index";
import { FilterByType } from "./FilterByType";

const mapDispatchToProps = (dispatch: Function) => ({
  handleChange: (types: IFilterByTypeOption[]) => {
    const filterValues = fp.map(fp.prop("value"), types);
    dispatch(filterByTypeChanged(filterValues));
  }
});

export const FilterByTypeContainer = connect(
  undefined,
  mapDispatchToProps
)(FilterByType);
