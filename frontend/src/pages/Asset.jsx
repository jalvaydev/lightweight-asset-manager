import { useQuery, gql } from "@apollo/client";

const ASSET = gql`
  query getAsset($input: String!) {
    asset(input: $input) {
      name
      id
      description
      cost
    }
  }
`;

export default function Asset() {
  const { loading, error, data } = useQuery(ASSET, {
    variables: { input: window.location.pathname.split("/")[2] },
  });

  if (loading) {
    <p>Loading...</p>;
  }

  if (error) {
    <p>Error! {error.message}</p>;
  }

  console.log(data);

  return (
    <div>
      {data && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Asset Information
            </h3>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.asset.name}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Cost</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {"$" + data.asset.cost}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Description
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {data.asset.description}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
