import { gql } from "@apollo/client";

export const COUNT_ASSETS = gql`
  query CountAssets {
    countAssets
  }
`;
