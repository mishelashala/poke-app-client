import React from "react";
import styled from "styled-components";
import { IPokemon } from "../../models";
import { PokemonList } from "../../modules/PokemonList";
import pokemonService from "../../services/PokemonService";

interface IHomeViewState {
  pokemons: IPokemon[];
}

const HomeWrapper = styled.main`
  padding: 1rem;
  box-sizing: border-box;
`;

const HomeTitle = styled.h2`
  font-family: arial;
  margin: 0 0 0.75rem 0;
  font-size: 1.2rem;
`;

export class HomeView extends React.Component<{}, IHomeViewState> {
  state = {
    pokemons: []
  };

  async componentDidMount() {
    const data = await pokemonService.getAll();
    this.setState({
      pokemons: data.results
    });
  }

  render() {
    return (
      <HomeWrapper>
        <HomeTitle>Pokemon List</HomeTitle>
        <PokemonList data={this.state.pokemons} />
      </HomeWrapper>
    );
  }
}
