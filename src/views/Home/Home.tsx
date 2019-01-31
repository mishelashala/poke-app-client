import React from "react";
import Select from "react-select";
import styled from "styled-components";
import { lowerCase } from "lodash/fp";
import { IPokemon } from "../../models";
import { PokemonList } from "../../modules/PokemonList";
import { IPokemonService } from "../../services/PokemonService";
import {
  ViewTitle,
  LoadingCard,
  LoadingTitle,
  SearchBar,
  colors
} from "../../ui/";

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

// filterSearchResults :: (String, IPokemon[]) -> IPokemon[]
const filterSearchResults = (name = "", pokemons: IPokemon[]) => {
  if (!name) {
    return pokemons;
  }

  return pokemons.filter((pokemon: IPokemon) =>
    lowerCase(pokemon.name).includes(lowerCase(name))
  );
};

interface IHomeViewState {
  isLoading: boolean;
  pokemons: IPokemon[];
  search: string;
}

const HomeWrapper = styled.main`
  padding: 1rem;
  box-sizing: border-box;
`;

const options = [
  { value: "fire", label: "Fire" },
  { value: "poison", label: "Poison" },
  { value: "water", label: "Water" }
];

export const HomeView = (pokemonService: IPokemonService) =>
  class extends React.Component<{}, IHomeViewState> {
    state = {
      isLoading: true,
      search: "",
      pokemons: []
    };

    async componentDidMount() {
      const data = await pokemonService.getAll();
      this.setState({
        isLoading: false,
        pokemons: data.results
      });
    }

    handleSearchChange = ({ target: { value } }: any) => {
      this.setState({ search: value });
    };

    render() {
      if (this.state.isLoading) {
        return (
          <HomeWrapper>
            <LoadingTitle />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </HomeWrapper>
        );
      }

      return (
        <HomeWrapper>
          <ViewTitle>Pokemon List</ViewTitle>
          <SearchBar
            placeholder="Search pokemon by name"
            type="search"
            value={this.state.search}
            onChange={this.handleSearchChange}
          />

          <Select
            isMulti
            name="types"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Pokemon Type"
            styles={{
              container: styles => {
                return {
                  ...styles,
                  marginBottom: "0.75rem"
                };
              },
              control: styles => {
                return { ...styles, fontFamily: "arial" };
              },
              option: styles => {
                return { ...styles, fontFamily: "arial" };
              },
              multiValue: (styles, { data }) => {
                return {
                  ...styles,
                  backgroundColor: getTypeLabelBackgroundColor(data.value),
                  color: "white",
                  fontFamily: "arial"
                };
              },
              multiValueLabel: styles => {
                return {
                  ...styles,
                  color: "white",
                  fontFamily: "arial"
                };
              }
            }}
          />

          <PokemonList
            data={filterSearchResults(this.state.search, this.state.pokemons)}
          />
        </HomeWrapper>
      );
    }
  };
