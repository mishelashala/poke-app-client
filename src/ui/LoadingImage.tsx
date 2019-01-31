import styled from "styled-components";
import { loadingAnimation } from "./animations";

export const LoadingImage = styled.div`
  animation: 0.5s ease ${loadingAnimation} infinite alternate;
  background-color: white;
  border-radius: 100%;
  height: 96px;
  margin: 0.5rem auto;
  width: 96px;
`;
