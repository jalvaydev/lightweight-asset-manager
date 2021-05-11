import { gql } from "@apollo/client";

export const ASSETS = gql`
  query Assets {
    assets {
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
