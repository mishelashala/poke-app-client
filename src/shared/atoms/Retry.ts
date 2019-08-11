import styled from "styled-components";
import { Text } from "./Text";

export const Retry = styled(Text)`
  color: blue;
  display: inline-block;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
