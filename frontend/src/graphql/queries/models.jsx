import { gql } from "@apollo/client";

export const MODELS = gql`
  query Models {
    models {
      name
      id
      manufacturer
      modelno
    }
  }
`;
