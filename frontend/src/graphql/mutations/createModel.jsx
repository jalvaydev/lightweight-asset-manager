import { gql } from "@apollo/client";

export const CREATE_MODEL = gql`
  mutation CreateModel($input: NewModel!) {
    createModel(input: $input) {
      name
      manufacturer
      modelno
    }
  }
`;
