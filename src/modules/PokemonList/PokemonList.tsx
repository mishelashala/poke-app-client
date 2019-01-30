import React from "react";
import { IPokemon } from "./index";
import { Link } from "react-router-dom";

interface IPokemonListProps {
  data: IPokemon[];
}

export const PokemonList: React.FunctionComponent<
  IPokemonListProps
> = props => (
  <section style={{ textAlign: "center" }}>
    {props.data.map((pokemon: IPokemon) => (
      <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
        <div
          style={{
            boxSizing: "border-box",
            backgroundColor: "lightgray",
            color: "#0090B2",
            display: "inline-block",
            fontFamily: "arial",
            margin: "0.25rem",
            padding: "0.5rem",
            textAlign: "center",
            width: "25%"
          }}
        >
          {pokemon.name}
        </div>
      </Link>
    ))}
  </section>
);
