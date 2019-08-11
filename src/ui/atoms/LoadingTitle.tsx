import styled from "styled-components";
import { loadingAnimation } from "../animations";

export const LoadingTitle = styled.div`
  animation: 0.5s ease ${loadingAnimation} infinite alternate;
  background-color: #eaeaea;
  height: 1.5rem;
  margin-bottom: 1rem;
  width: 10rem;
`;
