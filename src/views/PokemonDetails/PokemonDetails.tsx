import React from "react";
import { IPokemonDetails } from "../../models/";
import {
  PokemonCard,
  PokemonDetails,
  ViewTitle,
  LoadingCard,
  LoadingTitle
} from "../../ui";
import { TypeList } from "../../modules/TypeList";
import {
  PokemonDetailsWrapper,
  DetailsViewTitle,
  TypeListWrapper,
  AbilityLabel,
  DetailsText,
  Name,
  DetailsTypeWrapper
} from "./ui";

export interface IPokemonDetailsViewProps {
  match: {
    params: {
      pokemonName: string;
    };
  };
  data: IPokemonDetails;
  pokemonName: string;
  getPokemonDetails: any;
  isLoading: boolean;
  isCached: boolean;
}

export class PokemonDetailsView extends React.Component<
  IPokemonDetailsViewProps
> {
  async componentDidMount() {
    if (!this.props.isCached) {
      this.props.getPokemonDetails(this.props.pokemonName);
    }
  }

  render() {
    if (this.props.isLoading) {
      return (
        <PokemonDetailsWrapper>
          <LoadingTitle />
          <LoadingCard />
        </PokemonDetailsWrapper>
      );
    }

    return (
      <PokemonDetailsWrapper>
        <ViewTitle>Pokemon Details</ViewTitle>
        <div style={{ boxSizing: "border-box", textAlign: "center" }}>
          <PokemonCard>
            <img src={this.props.data.picture} />
            <PokemonDetails>
              <Name>{this.props.data.name}</Name>
              <DetailsText>Height: {this.props.data.height}'</DetailsText>
              <DetailsText>Weight: {this.props.data.weight}kgs</DetailsText>
            </PokemonDetails>
          </PokemonCard>

          <DetailsViewTitle>Type</DetailsViewTitle>
          <TypeListWrapper>
            <TypeList data={this.props.data.types} />
          </TypeListWrapper>

          <DetailsViewTitle>Abilities</DetailsViewTitle>
          <DetailsTypeWrapper>
            {this.props.data.abilities.map((ability: string) => {
              return <AbilityLabel key={ability}>{ability}</AbilityLabel>;
            })}
          </DetailsTypeWrapper>

          <DetailsViewTitle>Moves</DetailsViewTitle>
          <DetailsTypeWrapper>
            {this.props.data.moves.map((move: string) => {
              return <AbilityLabel key={move}>{move}</AbilityLabel>;
            })}
          </DetailsTypeWrapper>
        </div>
      </PokemonDetailsWrapper>
    );
  }
}
