import { gql } from "@apollo/client";

export const ASSET = gql`
  query getAsset($input: String!) {
    asset(input: $input) {
      name
      id
      note
      cost
      serial
      model
      status
      dateOfPurchase
    }
  }
`;
