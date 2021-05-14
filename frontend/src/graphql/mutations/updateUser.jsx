import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      firstName
      lastName
      email
      secondEmail
      mobilePhone
      login
      userType
      title
    }
  }
`;
