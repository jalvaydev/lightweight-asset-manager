import { gql } from "@apollo/client";

export const COUNT_ASSETS = gql`
  query CountAssets($input: String!) {
    countAssets(input: $input) {
      totalAssets
      inUse
      inStore
      service
      broken
    }
  }
`;
