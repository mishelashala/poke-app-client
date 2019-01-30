import styled from "styled-components";
import * as colors from "./colors";

export const PokemonCard = styled.div`
  box-sizing: border-box;
  background-color: ${colors.BACKGROUND_GRAY};
  border: 1px solid lightgray;
  border-radius: 0.3rem;
  color: ${colors.TEXT_COLOR};
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
