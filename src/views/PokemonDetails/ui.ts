import styled from "styled-components";
import { Text, ViewTitle } from "../../ui";

export const PokemonDetailsWrapper = styled.section`
  box-sizing: border-box;
  padding: 1rem;
`;

export const DetailsViewTitle = styled(ViewTitle)`
  margin-bottom: 0.25rem;
  text-align: left;
`;

export const TypeListWrapper = styled.div`
  margin-bottom: 1.25rem;
  text-align: left;
`;

export const AbilityLabel = styled(Text)`
  background-color: #f2f2f2;
  border-radius: 1rem;
  color: black;
  display: inline-block;
  font-size: 0.9rem;
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
`;

export const DetailsText = styled(Text)`
  margin-top: 0.2rem;
`;

export const Name = styled(Text)`
  margin-bottom: 0.5rem;
`;

export const DetailsTypeWrapper = styled.div`
  margin-bottom: 1.5rem;
  text-align: left;
`;
