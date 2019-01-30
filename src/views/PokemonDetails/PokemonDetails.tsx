import React from "react";
import pokemonService from "../../services/PokemonService";
import { IPokemonDetails } from "../../mappers/PokemonDetailsMapper";

interface IPokemonDetailsViewProps {
  match: {
    params: {
      pokemonName: string;
    };
  };
}

interface IPokemonDetailsViewState {
  data: IPokemonDetails;
}

export class PokemonDetailsView extends React.Component<
  IPokemonDetailsViewProps,
  IPokemonDetailsViewState
> {
  state = {
    data: {
      id: "",
      name: "",
      picture: "",
      weight: 0
    }
  };

  async componentDidMount() {
    const data = await pokemonService.getOneByName(
      this.props.match.params.pokemonName
    );
    this.setState({
      data
    });
  }

  render() {
    return (
      <section>
        <p>pokemon details</p>
        <div>
          <img src={this.state.data.picture} />
          <p>{this.state.data.name}</p>
          <p>Details</p>
          <p>Weight: {this.state.data.weight}</p>
        </div>
      </section>
    );
  }
}
