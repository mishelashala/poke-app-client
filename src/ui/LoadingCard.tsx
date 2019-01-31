import styled from "styled-components";
import { loadingAnimation } from "./animations";

export const LoadingCard = styled.div`
  animation: 0.5s ease ${loadingAnimation} infinite alternate;
  background-color: #eaeaea;
  border-radius: 0.3rem;
  height: 10rem;
  margin-bottom: 1rem;
  width: 100%;
`;
