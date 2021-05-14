import { gql } from "@apollo/client";

export const UPDATE_ASSET = gql`
  mutation updateAsset($input: UpdateAssetInput!) {
    updateAsset(input: $input) {
      id
    }
  }
`;
