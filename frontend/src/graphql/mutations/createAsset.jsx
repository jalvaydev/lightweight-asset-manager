import { gql } from "@apollo/client";

export const CREATE_ASSET = gql`
  mutation CreateAsset($input: NewAsset!) {
    createAsset(input: $input) {
      id
      name
      note
      cost
      serial
      model
      status
      dateOfPurchase
    }
  }
`;
