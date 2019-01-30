import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Text } from "../../ui";

const PokemonContainer = styled.div`
  box-sizing: border-box;
  background-color: #f2f2f2;
  color: #0090b2;
  display: inline-block;
  font-family: arial;
  margin: 0 0 1rem 0;
  padding: 0.5rem;
  textalign: center;
  width: 100%;

  ::last-child {
    margin-bottom: 0;
  }
`;

interface IPokemonItemProps {
  name: string;
}

export class PokemonItem extends React.Component<IPokemonItemProps> {
  render() {
    return (
      <Link to={`/pokemon/${this.props.name}`}>
        <PokemonContainer>
          <Text>{this.props.name}</Text>
        </PokemonContainer>
      </Link>
    );
  }
}
