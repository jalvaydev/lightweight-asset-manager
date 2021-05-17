import { gql } from "@apollo/client";

export const ASSET_BY_NAME = gql`
  query assetByName($input: String!) {
    assetByName(input: $input)
  }
`;
