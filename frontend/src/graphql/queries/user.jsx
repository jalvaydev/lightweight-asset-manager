import { gql } from "@apollo/client";

export const USER = gql`
  query User($id: String!) {
    user(id: $id) {
      firstName
      lastName
      email
      secondEmail
      mobilePhone
      login
      userType
      title
      department
    }
  }
`;
