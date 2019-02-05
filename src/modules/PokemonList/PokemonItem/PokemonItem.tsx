import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Text, PokemonCard, PokemonDetails, LoadingImage } from "../../../ui";
import { TypeList } from "../../TypeList";

const PokemonItemImage = styled.img`
  border-radius: 50%;
  box-sizing: border-box;
  height: 96px;
  margin: 0.5rem auto;
`;

const PokemonTypes = styled.div`
  margin: 0.75rem 0 0.25rem 0;
`;

interface IPokemonItemProps {
  isLoading: boolean;
  name: string;
  picture: string;
  type: string[];
  fetchPokemon: (n: string) => void;
  isCached: boolean;
}

export class PokemonItem extends React.Component<IPokemonItemProps> {
  componentDidMount() {
    if (!this.props.isCached) {
      this.props.fetchPokemon(this.props.name.toLowerCase());
    }
  }

  render() {
    return (
      <Link to={`/pokemon/${this.props.name}`}>
        <PokemonCard>
          {this.props.isLoading && <LoadingImage />}

          {!this.props.isLoading && (
            <PokemonItemImage src={this.props.picture} />
          )}

          <PokemonDetails>
            <Text>{this.props.name}</Text>
            <PokemonTypes>
              <TypeList data={this.props.type} />
            </PokemonTypes>
          </PokemonDetails>
        </PokemonCard>
      </Link>
    );
  }
}
