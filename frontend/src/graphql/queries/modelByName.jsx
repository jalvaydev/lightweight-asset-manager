import { gql } from "@apollo/client";

export const MODEL_BY_NAME = gql`
  query modelByName($name: String!) {
    modelByName(name: $name) {
      name
      manufacturer
      modelno
      id
    }
  }
`;
