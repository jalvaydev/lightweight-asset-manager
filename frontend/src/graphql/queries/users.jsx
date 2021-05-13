import { gql } from "@apollo/client";

export const USERS = gql`
  query Users {
    users {
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
