import { gql } from "@apollo/client";

export const DELETE_ASSET = gql`
  mutation DeleteAsset($input: String!) {
    deleteAsset(input: $input)
  }
`;
