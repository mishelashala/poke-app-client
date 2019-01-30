import React from "react";
import { PokemonList, IPokemon } from "../../modules/PokemonList";
import pokemonService from "../../services/PokemonService";

interface IHomeViewState {
  pokemons: IPokemon[];
}

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
      <React.Fragment>
        <div>Pokedex</div>
        <section>pokemon list</section>
        <PokemonList data={this.state.pokemons} />
      </React.Fragment>
    );
  }
}
