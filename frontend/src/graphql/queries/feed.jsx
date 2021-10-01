import { gql } from "@apollo/client";

export const FEED = gql`
  query Feed($skip: Int!, $limit: Int!, $sortBy: String, $order: Int) {
    feed(skip: $skip, limit: $limit, sortBy: $sortBy, order: $order) {
      id
      name
      note
      cost
      serial
      model{
        name
      }
      status
      dateOfPurchase
    }
  }
`;
