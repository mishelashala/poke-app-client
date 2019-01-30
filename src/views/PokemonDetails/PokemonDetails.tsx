import React from "react";
import pokemonService from "../../services/PokemonService";
import { IPokemonDetails } from "../../mappers/PokemonDetailsMapper";
import { Text } from "../../ui";

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
        <Text>pokemon details</Text>
        <div>
          <img src={this.state.data.picture} />
          <Text>{this.state.data.name}</Text>
          <Text>Details</Text>
          <Text>Weight: {this.state.data.weight}</Text>
        </div>
      </section>
    );
  }
}
