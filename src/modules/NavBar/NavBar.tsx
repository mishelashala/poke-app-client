import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Text } from "../../ui/atoms/Text";

const NavBarWrapper = styled.nav`
  background-color: #ee6b2f;
  padding: 0.75rem;
`;

const NavBarText = styled(Text)`
  color: white;
`;

const NavBarLink = styled(Link)`
  text-decoration: none;
`;

export const NavBar = () => {
  return (
    <NavBarWrapper>
      <NavBarLink to="/" title="Link to pokedex home">
        <NavBarText>Pokedex</NavBarText>
      </NavBarLink>
    </NavBarWrapper>
  );
};
