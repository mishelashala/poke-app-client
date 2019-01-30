import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import pokemonService from "../../services/PokemonService";
import { Text } from "../../ui";

const PokemonCard = styled.div`
  box-sizing: border-box;
  background-color: #f2f2f2;
  border: 1px solid lightgray;
  border-radius: 0.3rem;
  color: #0090b2;
  display: inline-block;
  font-family: arial;
  margin: 0 0 1rem 0;
  padding: 0;
  textalign: center;
  width: 100%;

  ::last-child {
    margin-bottom: 0;
  }
`;

const PokemonStats = styled.div`
  background-color: white;
  box-sizing: border-box;
  border-radius: 0 0 0.4rem 0.4rem;
  width: 100%;
`;

interface IPokemonItemProps {
  id: string;
  name: string;
}

export class PokemonItem extends React.Component<IPokemonItemProps> {
  state = {
    data: {
      picture: ""
    }
  };

  async componentDidMount() {
    const pokemon = await pokemonService.getOneById(this.props.id);
    this.setState({
      isLoading: false,
      data: { ...pokemon }
    });
  }

  render() {
    return (
      <Link to={`/pokemon/${this.props.id}`}>
        <PokemonCard>
          <img src={this.state.data.picture} />
          <PokemonStats>
            <div style={{ boxSizing: "border-box", padding: "0.5rem" }}>
              <Text>{this.props.name}</Text>
            </div>
          </PokemonStats>
        </PokemonCard>
      </Link>
    );
  }
}
