import React from "react";
import { NavBarWrapper } from "../atoms/NavBarWrapper";
import { NavBarText } from "../atoms/NavBarText";
import { NavBarLink } from "../atoms/NavBarLink";

export const NavBar = () => {
  return (
    <NavBarWrapper>
      <NavBarLink to="/" title="Link to pokedex home">
        <NavBarText>Pokedex</NavBarText>
      </NavBarLink>
    </NavBarWrapper>
  );
};
