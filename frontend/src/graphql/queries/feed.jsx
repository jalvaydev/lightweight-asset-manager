import { gql } from "@apollo/client";

export const FEED = gql`
  query Feed($skip: Int!, $limit: Int!) {
    feed(skip: $skip, limit: $limit) {
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
